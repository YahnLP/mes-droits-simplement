"""Synchronise des paramètres OpenFisca publics; n'envoie aucune donnée utilisateur.
Exécution GitHub Actions uniquement. Échec réseau = conservation du fichier précédent.
"""
import datetime as dt
import json
import math
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'openfisca-parameters.json'
BASE = 'https://api.fr.openfisca.org/latest'
PARAMETERS = {
    'bmaf': 'prestations_sociales.prestations_familiales.bmaf.bmaf',
    'rsa_base': 'prestations_sociales.solidarite_insertion.minima_sociaux.rsa.rsa_m.montant_de_base',
    'ppa_base': 'prestations_sociales.solidarite_insertion.minima_sociaux.ppa.pa_m.montant_de_base',
}

def retrieve(path):
    url = BASE + '/parameters/' + path
    req = urllib.request.Request(url, headers={'User-Agent': 'MesDroitsSimplement/1.2 (veille-parametres)', 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=18) as resp:
        data = json.load(resp)
    return data, url

def parse_value(data, today):
    # API OpenFisca: les paramètres peuvent contenir des valeurs datées, ou une valeur scalaire.
    if isinstance(data, dict) and isinstance(data.get('value'), (int, float)):
        val = data['value']
        return val, data.get('instant') or data.get('date')
    if isinstance(data, dict):
        values = data.get('values')
        if isinstance(values, dict):
            dated = [(k, v) for k, v in values.items() if isinstance(k, str) and k[:10] <= today and isinstance(v, (int,float,dict))]
            for k,v in sorted(dated, reverse=True):
                if isinstance(v, dict): v = v.get('value')
                if isinstance(v,(int,float)): return v,k[:10]
        if isinstance(values, list):
            dated = [(v.get('instant') or v.get('date'),v.get('value')) for v in values if isinstance(v,dict)]
            for date,val in sorted(((d,v) for d,v in dated if isinstance(d,str) and d[:10]<=today),reverse=True):
                if isinstance(val,(int,float)):return val,date[:10]
    return None,None

def main():
    today=dt.date.today().isoformat()
    old=json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {'parameters':{}}
    entries=dict(old.get('parameters',{}))
    failures=[]
    for name,path in PARAMETERS.items():
        try:
            data,url=retrieve(path)
            value,effective=parse_value(data,today)
            if not isinstance(value,(int,float)) or not math.isfinite(value) or value<=0 or value>100000:
                raise ValueError('Valeur absente ou hors bornes; format à contrôler')
            if not effective or not isinstance(effective,str) or len(effective)<10:
                raise ValueError('Date d’effet absente')
            entries[name]={'value':round(value,5),'effectiveDate':effective[:10], 'checkedAt':today,'source':url,'status':'openfisca-model-parameter','warning':'Paramètre du modèle OpenFisca, non une prestation calculée ni une validation juridique'}
        except Exception as exc:
            failures.append(f'{name}: {exc}')
    if len(failures)==len(PARAMETERS):
        raise SystemExit('Aucun paramètre vérifié aujourd’hui : '+ '; '.join(failures))
    payload={'schemaVersion':1,'provider':'OpenFisca-France','providerInfo':'https://github.com/openfisca/openfisca-france','notice':'Paramètres de modèle : ne constituent pas une décision officielle ni un calcul complet de prestation.','parameters':entries}
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Paramètres enregistrés:', ', '.join(entries))
    if failures:print('Paramètres non mis à jour (ancienne donnée conservée):', '; '.join(failures))

if __name__=='__main__':main()
