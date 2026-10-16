'use strict';
(function(root){
 const parseDate=s=>{if(typeof s!== 'string'|| !/^\d{4}-\d{2}-\d{2}$/.test(s))return null;const [y,m,d]=s.split('-').map(Number);const dt=new Date(Date.UTC(y,m-1,d));return dt.getUTCFullYear()===y&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d?dt:null};
 const monthIndex=d=>d.getUTCFullYear()*12+d.getUTCMonth();
 const round=n=>Math.round((n+Number.EPSILON)*100)/100;
 const api={
 estimate(rate,children,income){
  if(!rate||rate.id!=='allocations_familiales_base_2026'||rate.effectiveDate!=='2026-04-01'||rate.incomeYear!==2024||rate.scope!=='metropole')return null;
  if(!Number.isInteger(children)||children<2||children>5||typeof income!=='number'||!Number.isFinite(income)||income<0||income>1e9)return null;
  const tier=rate.tiers[String(children)];if(!tier||tier.limits.length!==2||tier.amounts.length!==3||tier.amounts.some(x=>!Number.isFinite(x)||x<=0))return null;
  const level=income<=tier.limits[0]?0:income<=tier.limits[1]?1:2;
  return {amount:tier.amounts[level],level:level+1,children,year:rate.incomeYear,source:rate.source,limits:tier.limits,baseOnly:true};
 },
 taper(rate,children,income,ageBonusCount=0){
  const base=api.estimate(rate,children,income);
  if(!base||!rate.ageBonus||!Array.isArray(rate.ageBonus.amounts)||rate.ageBonus.amounts.length!==3||rate.ageBonus.amounts.some(x=>!Number.isFinite(x)||x<0)||!Number.isInteger(ageBonusCount)||ageBonusCount<0||ageBonusCount>children)return null;
  const tier=rate.tiers[String(children)];
  const level=base.level-1;
  const current=round(base.amount+ageBonusCount*rate.ageBonus.amounts[level]);
  let total=current,threshold=null,complement=0;
  if(level>0){
   const previous=level-1;
   threshold=tier.limits[previous];
   const higher=round(tier.amounts[previous]+ageBonusCount*rate.ageBonus.amounts[previous]);
   const excess=income-threshold;
   if(excess>0&&excess<12*higher){
    const transitional=round((threshold+12*higher-income)/12);
    total=Math.max(current,transitional);
    complement=round(total-current);
   }
  }
  return {total,complement,threshold,base:current};
 },
 safeEstimate(rate,birthDates,income,month,context){
  if(!context||context.metropole!==true||context.allChildrenAtCharge!==true||context.sharedCustody!==false||context.specialSituation!==false)return {status:'unsupported'};
  const result=api.estimateWithAges(rate,birthDates,income,month);return result?{status:'estimate',result}:{status:'unsupported'};
 },
 estimateWithAges(rate,birthDates,income,month){
  if(!Array.isArray(birthDates)||birthDates.length<2||birthDates.length>5||!rate?.ageBonus)return null;
  const when=parseDate(month+'-01');if(!when||month<'2026-04'||month>'2027-03')return null;
  const dates=birthDates.map(parseDate);if(dates.some(d=>!d||d>when))return null;
  const eligible=dates.every(d=>monthIndex(when)<monthIndex(new Date(Date.UTC(d.getUTCFullYear()+20,d.getUTCMonth(),1))));
  if(!eligible)return null;
  const base=api.estimate(rate,dates.length,income);if(!base)return null;
  const threshold=parseDate(rate.ageBonus.birthDateThreshold);const bonusAmount=rate.ageBonus.amounts[base.level-1];if(!Number.isFinite(bonusAmount))return null;
  const eldest=dates.reduce((i,d,k)=>d<dates[i]?k:i,0);
  const qualified=dates.map((date,i)=>{
   if(dates.length===2&&i===eldest)return false;
   const years=date<threshold?14:18;
   const birthday=new Date(Date.UTC(date.getUTCFullYear()+years,date.getUTCMonth(),date.getUTCDate()));
   return monthIndex(when)>monthIndex(birthday);
  });
  const count=qualified.filter(Boolean).length;
  const subtotal=round(base.amount+count*bonusAmount);
  const supplement=api.taper(rate,dates.length,income,count);
  if(!supplement)return null;
  return {...base,ageBonus:round(count*bonusAmount),ageBonusCount:count,estimatedSubtotal:subtotal,complementDegressif:supplement.complement,estimatedWithTaper:supplement.total,month,partial:true};
 }
 };
 root.DroitsFamily=Object.freeze(api);
})(typeof window!=='undefined'?window:globalThis);
