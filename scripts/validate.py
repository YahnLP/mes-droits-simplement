import json,pathlib,sys
root=pathlib.Path(__file__).resolve().parents[1]
a=json.loads((root/'data/aides.json').read_text());sources=json.loads((root/'data/sources.json').read_text());docs=json.loads((root/'data/documents.json').read_text());translations=json.loads((root/'data/i18n.json').read_text())
assert len(a['aids'])>=14
assert len({x['id'] for x in a['aids']})==len(a['aids'])
assert all(x.get('url','').startswith('https://') and x.get('reviewStatus') in ('to-review','reviewed') for x in a['aids'])
assert all(x.get('amountCalculation') is False for x in a['aids'])
assert len({s['id'] for s in sources})==len(sources)
assert all(x.get('url','').startswith('https://') for x in sources)
assert len(docs)>=8 and all('actions' in d and 'warnings' in d for d in docs)
assert all(k in translations for k in ('fr','en','es','ar'))
assert all(set(translations['fr'])==set(translations[lang]) for lang in translations)
print('OK : aides, sources, documents, traductions')
