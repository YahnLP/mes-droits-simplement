#!/usr/bin/env python3
"""Veille de pages publiques. Jamais de modification des règles validées."""
import datetime as dt, hashlib, html, json, pathlib, re, urllib.request, urllib.error
ROOT=pathlib.Path(__file__).resolve().parents[1]
SOURCES=json.loads((ROOT/'data/sources.json').read_text())
PATH=ROOT/'data/source-watch.json'
old=json.loads(PATH.read_text()) if PATH.exists() else {}
new={}; changes=[]
for source in SOURCES:
    sid=source['id']; url=source['url']
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'MesDroitsVeille/0.2 (+public-source-monitor)','Accept':'text/html'})
        with urllib.request.urlopen(req,timeout=22) as response:
            final=response.geturl()
            if not final.startswith('https://') or not any(final.split('/')[2].endswith(x) for x in ('service-public.fr','impots.gouv.fr')):
                raise ValueError('Redirection hors domaine officiel')
            raw=response.read(2_000_000).decode('utf-8','replace')
        raw=re.sub(r'<(script|style|nav|footer|header)\b[^>]*>.*?</\1>',' ',raw,flags=re.I|re.S)
        raw=re.sub(r'<[^>]*>',' ',raw)
        plain=html.unescape(re.sub(r'\s+',' ',raw)).strip()
        if len(plain)<250: raise ValueError('Page trop courte ou bloquée')
        fingerprint=hashlib.sha256(plain.encode()).hexdigest()
        entry={'url':url,'title':source['title'],'sha256':fingerprint,'status':'ok','changedOrFirstSeenAt':(old.get(sid,{}).get('changedOrFirstSeenAt') if old.get(sid,{}).get('sha256')==fingerprint else dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d'))}
        if sid in old and old[sid].get('sha256')!=fingerprint:changes.append((sid,'Contenu modifié'))
        if sid not in old:changes.append((sid,'Première observation (référence à valider)'))
        new[sid]=entry
    except (OSError,ValueError,UnicodeError) as e:
        # Do not overwrite previous fingerprint when source is unreachable.
        new[sid]={**old.get(sid,{}),'url':url,'title':source['title'],'status':'error','error':str(e)[:180]}
        changes.append((sid,'Contrôle impossible : intervention humaine'))
PATH.write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n')
report=ROOT/'data/veille-rapport.md'
report.write_text('# Rapport de veille documentaire\n\nDate : '+dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d')+'\n\n**Aucune règle ni aucun montant n’a été modifié automatiquement.**\n\n'+(''.join(f'- **{sid}** : {message} — {next(s["url"] for s in SOURCES if s["id"]==sid)}\n' for sid,message in changes) if changes else 'Aucun changement détecté sur les empreintes observées.\n')+'\nLes variations peuvent provenir de la mise en page : contrôler les règles et les dates d’effet avant de modifier `data/aides.json`.\n')
print(f'{len(SOURCES)} sources examinées, {len(changes)} alertes')
