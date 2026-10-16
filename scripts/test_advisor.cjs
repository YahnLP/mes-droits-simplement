const assert=require('node:assert/strict');require('../rsa-advisor.js');
const a=globalThis.DroitsAdvisor.assess;
assert.equal(a(['yes','yes','yes','no','yes']),'ready');
assert.equal(a(['no','yes','yes','no','yes']),'stop');
assert.equal(a(['yes','yes','yes','yes','yes']),'stop');
assert.equal(a(['yes','yes','yes','no','no']),'missing');
assert.equal(a(['yes','unsure','yes','no','yes']),'missing');
assert.equal(a(['yes']),'incomplete');
console.log('6 tests du parcours conseiller réussis');
