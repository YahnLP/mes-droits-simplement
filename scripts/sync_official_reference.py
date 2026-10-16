#!/usr/bin/env python3
"""Fetch a single, explicitly identified official BMAF reference. No user data sent.
A mismatch, unavailable page or ambiguous extraction keeps the previous figure.
"""
import datetime, html, json, pathlib, re, urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
URL='https://www.service-public.gouv.fr/particuliers/actualites/A16506'
FILE=ROOT/'data/official-rates.json'

def parse_bmaf(text):
    # Strip scripts/styles, then tags; normalize spaces for robust bounded matching.
    text=re.sub(r'<(script|style)\b[^>]*>.*?</\1>',' ',text,flags=re.I|re.S)
    text=html.unescape(re.sub(r'<[^>]+>',' ',text))
    text=re.sub(r'\s+',' ',text.replace('\u202f',' ').replace('\xa0',' '))
    matches=re.findall(r'(?:base mensuelle de calcul des allocations familiales|BMAF).{0,180}?(?:s[’\']élève à|est fixée à|s’établit à)\s*(\d{2,4}[,.]\d{2})\s*€',text,re.I)
    values={float(v.replace(',','.')) for v in matches}
    if len(values)!=1:raise ValueError('Montant absent ou ambigu')
    amount=values.pop()
    if not 300<=amount<=700:raise ValueError('Montant hors plage de sécurité')
    return amount

def update():
    req=urllib.request.Request(URL,headers={'User-Agent':'MesDroitsReferenceWatcher/1.1','Accept':'text/html'})
    with urllib.request.urlopen(req,timeout=20) as response:
        if response.geturl()!=URL:raise ValueError('Redirection inattendue')
        if 'html' not in response.headers.get('Content-Type',''):raise ValueError('Contenu non HTML')
        raw=response.read(500001)
        if len(raw)>500000:raise ValueError('Réponse trop grande')
    amount=parse_bmaf(raw.decode('utf-8'))
    data=json.loads(FILE.read_text())
    rate=next(r for r in data['rates'] if r['id']=='bmaf_reference_2026')
    previous=float(rate['amountEuro'])
    if abs(amount-previous)>previous*.05:raise ValueError('Écart > 5 %, contrôle nécessaire')
    # Date of effect is NOT inferred from the page. On a changed amount, do not
    # publish without an unambiguous effective date and the corresponding rule.
    if amount!=previous:raise ValueError('Nouveau montant détecté : date d’effet à vérifier avant activation')
    rate['verifiedAt']=datetime.datetime.now(datetime.timezone.utc).date().isoformat()
    data['updatedAt']=rate['verifiedAt']
    FILE.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    print('BMAF contrôlée sur Service-Public :',amount)
if __name__=='__main__':update()
