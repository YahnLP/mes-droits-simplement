'use strict';
// Outils de préparation du dossier, pas une simulation de prestations.
window.DroitsPersonal = Object.freeze({
  summary(s){
    const values=['m1','m2','m3'].map(k=>s[k]);
    if(values.some(v=>v===''||v===null||v===undefined||typeof v==='boolean'))return null;
    const n=values.map(Number);
    if(n.some(v=>!Number.isFinite(v)||v<0||v>100000))return null;
    const total=n.reduce((a,b)=>a+b,0);
    return {total,average:total/3,months:3,min:Math.min(...n),max:Math.max(...n),monthsWithoutIncome:n.filter(v=>v===0).length};
  },
  // Un repérage par âge uniquement : jamais une décision d'attribution.
  childAgeScreening(raw){
    if(typeof raw!=='string'||!raw.trim())return null;
    const parts=raw.split(/[,;\s]+/).filter(Boolean);
    if(parts.length>25||parts.some(x=>!/^\d{1,2}$/.test(x)))return null;
    const ages=parts.map(Number);
    if(ages.some(a=>a>25))return null;
    return {count:ages.length,under3:ages.filter(a=>a<3).length,schoolAge:ages.filter(a=>a>=6&&a<=17).length,boundary18:ages.filter(a=>a===18).length,ages};
  }
});
