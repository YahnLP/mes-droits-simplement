const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');const path=require('node:path');
const context=vm.createContext({});for(const name of ['handoff.js','decision-tree.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),context);
const h=context.DroitsHandoff,d=context.DroitsDecisionTree;
assert.equal(h.get(),null);assert.equal(h.set({situation:'unknown'}),false);assert.equal(h.set(d.getHandoff('loss')),true);assert.equal(h.get().situation,'job-loss');assert.equal(d.getHandoff('document'),null);h.clear();assert.equal(h.get(),null);
assert.equal(d.next('work','lost'),'report');assert.equal(d.next('report','no'),'notify');console.log('Handoff: 8 assertions OK');
