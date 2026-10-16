const assert=require('node:assert/strict');
require('../decision-tree.js');
const tree=globalThis.DroitsDecisionTree;
assert.deepEqual(tree.locales.sort(),['ar','en','es','fr']);
const paths={
 season:[['start','work'],['work','vary']],
 loss:[['start','work'],['work','lost'],['report','yes']],
 notify:[['start','work'],['work','lost'],['report','no']],
 uncertain:[['start','work'],['work','lost'],['report','unsure']],
 declare:[['start','work'],['work','unsure']],
 documentUrgent:[['start','letter'],['letter','yes']],
 document:[['start','letter'],['letter','no']],
 housingUrgent:[['start','housing'],['housing','yes']],
 housing:[['start','housing'],['housing','no']],
 benefits:[['start','benefits']],
 rsa:[['start','rsa']]
};
for(const [end,steps] of Object.entries(paths)){let node='start';for(const [from,answer] of steps){assert.equal(node,from);node=tree.next(node,answer)}assert.equal(node,end);assert.match(tree.destinations[end],/^https:\/\//)}
for(const node of Object.keys(tree.nodes)){assert.equal(tree.next(node,'INVALID'),null);for(const answer of tree.nodes[node].choices)assert.ok(tree.next(node,answer));}
assert.equal(tree.next('unknown','yes'),null);
console.log('Decision tree: 11 end-to-end paths, every branch, invalid answers, 4 locales OK');
