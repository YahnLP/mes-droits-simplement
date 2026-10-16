'use strict';
// Volatile handoff: no cookies, storage, URL parameters or network calls.
(function(root){
 let context=null;
 const allowed=new Set(['job-loss','variable-income','income-unknown','rsa-request']);
 const api=Object.freeze({
  set(value){if(!value||!allowed.has(value.situation))return false;context=Object.freeze({situation:value.situation});return true;},
  get(){return context?{...context}:null;},
  clear(){context=null;}
 });
 root.DroitsHandoff=api;
})(typeof window!=='undefined'?window:globalThis);
