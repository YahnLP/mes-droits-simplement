'use strict';
/* Conservative, explainable screening: no eligibility decision or euro amount. */
(function(root){
 const aliases={housing:'logement',working:'prime',twoChildren:'famille',children:'ars',baby:'paje',singleParent:'asf',all:null,disability:'aah',unemployed:'are',senior:'aspa',dependentSenior:'apa'};
 const rules={
 logement:s=>({status:s.home==='tenant'?'priority':'check',reasons:['housing-details','resources-12-months','residence']}),
 rsa:s=>({status:s.age!==''&&Number(s.age)>=25?'priority':'check',reasons:['age-and-exceptions','household-resources','residence']}),
 prime:s=>({status:['employee','season','temporary','agriculture'].includes(s.work)?'priority':'check',reasons:['professional-activity','quarterly-resources','residence']}),
 famille:s=>({status:s.children!==''&&Number(s.children)>=2?'priority':'check',reasons:['number-and-age-children','annual-tax-resources','residence']}),
 ars:s=>({status:s.children!==''&&Number(s.children)>0?'priority':'check',reasons:['school-age','annual-tax-resources']}),
 paje:s=>({status:s.youngChild==='yes'?'priority':'check',reasons:['child-under-three-or-pregnancy','resources']}),
 asf:s=>({status:s.couple==='no'&&Number(s.children)>0?'priority':'check',reasons:['single-parent','support-payments']}),
 aah:s=>({status:s.disability==='yes'?'priority':'check',reasons:['disability-decision','resources','residence']}),
 are:s=>({status:s.work==='unemployed'||s.endContract==='yes'?'priority':'check',reasons:['employment-history','contract-end','registration']}),
 aspa:s=>({status:s.age!==''&&Number(s.age)>=65?'priority':'check',reasons:['age-exceptions','pension-and-resources','residence']}),
 apa:s=>({status:s.age!==''&&Number(s.age)>=60&&s.care==='yes'?'priority':'check',reasons:['loss-of-autonomy','age','department']}),
 css:s=>({status:'check',reasons:['resources-12-months','health-insurance']}),
 fiscal:s=>({status:'check',reasons:['tax-year','eligible-expenses']}),
 energie:s=>({status:'check',reasons:['tax-reference-income','household']}),
 };
 function evaluate(a,s){let r=rules[a.id]||rules[aliases[a.rule]];return r?r(s):{status:'check',reasons:['individual-conditions']}}
 root.DroitsRules={evaluate};
 if(typeof module!=='undefined'&&module.exports)module.exports={evaluate};
 })(typeof module!=='undefined'&&module.exports?module.exports:window);
