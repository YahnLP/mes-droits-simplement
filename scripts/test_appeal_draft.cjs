const assert=require('node:assert/strict');
require('../appeal-draft.js');
const g=globalThis.DroitsAppealDraft;
assert.equal(g.locales.length,4);
for(const lang of g.locales){
 assert.equal(g.draft(lang,['','','']),null);
 assert.equal(g.draft(lang,['a','b']),null);
 for(let i=0;i<3;i++){
  const a=['','',''];a[i]='Test factuel';const s=g.draft(lang,a);
  assert.ok(s.includes('Test factuel'));
  assert.ok(!s.includes('undefined'));
 }
}
console.log('Appeal draft tests passed');
