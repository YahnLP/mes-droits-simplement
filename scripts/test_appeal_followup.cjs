const assert=require('node:assert/strict');
require('../appeal-followup.js');
const api=globalThis.DroitsAppealFollowup;
assert.equal(api.locales.length,4);
for(const lang of api.locales){for(let sent=0;sent<3;sent++){for(let proof=0;proof<3;proof++){for(let reply=0;reply<4;reply++){assert.ok(api.guidance(lang,sent,proof,reply).length>60);}}}}
assert.equal(api.guidance('fr',3,0,0),null);
assert.equal(api.guidance('fr',0,-1,0),null);
assert.match(api.guidance('fr',0,0,1),/accusé de réception/i);
console.log('110 checks passed');
