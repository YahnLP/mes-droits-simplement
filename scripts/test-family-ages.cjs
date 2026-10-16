const assert=require('node:assert/strict');const fs=require('node:fs');require('../family-estimator.js');const r=JSON.parse(fs.readFileSync('data/family-allowances-2026.json'));const f=globalThis.DroitsFamily.estimateWithAges;
assert.equal(f(r,['2009-02-01','2010-04-01'],35000,'2026-10').ageBonus,76.13); // eldest excluded
assert.equal(f(r,['2010-04-01','2012-03-01'],35000,'2026-10').ageBonus,0); // 18 not yet
assert.equal(f(r,['2010-04-01','2012-03-01'],35000,'2030-04'),null); // outside verified period
assert.equal(f(r,['2008-02-01','2010-04-01','2013-01-01'],35000,'2026-10').ageBonus,152.26);
assert.equal(f(r,['2006-01-01','2015-01-01'],35000,'2026-10'),null); // aged 20
assert.equal(f(r,['2010-04-01','2010-04-01'],35000,'2026-10').ageBonus,76.13); // jumeaux autorisés
assert.equal(f(r,['2010-04-01','2015-02-30'],35000,'2026-10'),null);
assert.equal(f(r,['2010-04-01','2015-02-01'],35000,'2026-03'),null);
console.log('8 age/date tests passed');
