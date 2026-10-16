#!/usr/bin/env python3
"""Observe des pages officielles. Publie UNIQUEMENT un état de vérification.
Ne transforme jamais une page HTML en barème, droit ou décision.
"""
import datetime as dt, hashlib, html, json, pathlib, re, urllib.request
from urllib.parse import urlparse
ROOT=pathlib.Path(__file__).resolve().parents[1]
SOURCES=json.loads((ROOT/'data/sources.json').read_text(encoding='utf-8'))
PATH=ROOT/'data/source-watch.json'
old=json.loads(PATH.read_text(encoding='utf-8')) if PATH.exists() else {}
new={}; changes=[]
ALLOWED={'service-public.fr','impots.gouv.fr','caf.fr','msa.fr','ameli.fr','francetravail.fr','info-retraite.fr','lassuranceretraite.fr'}
def official(url):
 p=urlparse(url)
 return p.scheme=='https' and any(p.hostname==d or (p.hostname or '').endswith('.'+d) for d in ALLOWED)
for source in SOURCES:
 sid,url=source['id'],source['url']; prior=old.get(sid,{})
 try:
  if not official(url): raise ValueError('Source non autorisée')
  req=urllib.request.Request(url,headers={'User-Agent':'MesDroitsSourceCheck/1.0','Accept':'text/html'})
  with urllib.request.urlopen(req,timeout=18) as response:
   if not official(response.geturl()):raise ValueError('Redirection non officielle')
   ctype=response.headers.get('Content-Type','')
   if 'html' not in ctype:raise ValueError('Contenu non HTML')
   raw=response.read(1_000_001)
   if len(raw)>1_000_000:raise ValueError('Page trop volumineuse')
   raw=raw.decode('utf-8','replace')
  clean=re.sub(r'<(script|style|nav|footer|header)\b[^>]*>.*?</\1>',' ',raw,flags=re.I|re.S)
  clean=html.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',clean))).strip()
  if len(clean)<300:raise ValueError('Page trop courte ou bloquée')
  sha=hashlib.sha256(clean.encode()).hexdigest()
  changed=bool(prior.get('sha256') and prior['sha256']!=sha)
  new[sid]={'url':url,'title':source['title'],'sha256':sha,'status':'ok','checkedAt':dt.date.today().isoformat(),'changedAt':dt.date.today().isoformat() if changed else prior.get('changedAt'),'changed':changed}
  if changed:changes.append(sid)
 except Exception as e:
  # Erreur : garder l'empreinte précédente, ne jamais marquer comme vérifiée.
  new[sid]={**prior,'url':url,'title':source['title'],'status':'error','checkedAt':dt.date.today().isoformat(),'error':str(e)[:120]}
PATH.write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(SOURCES)} pages contrôlées ; {len(changes)} changements détectés ; {sum(x["status"]=="error" for x in new.values())} erreurs')
