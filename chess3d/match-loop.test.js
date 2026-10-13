import assert from 'node:assert/strict';
import {Chess} from 'chess.js';
import {continueMatch} from './match-loop.js';
function mate(){const c=new Chess();['f3','e5','g4','Qh4#'].forEach(m=>c.move(m));return c;}
let c=mate(),restarts=0;
assert.equal(continueMatch({chess:c,mode:'watch',running:true,restart:()=>{restarts++;c.reset();}}),true);
assert.equal(restarts,1);assert.equal(c.history().length,0);assert.equal(c.isGameOver(),false);
for(const [mode,running] of [['human',true],['watch',false]]){c=mate();assert.equal(continueMatch({chess:c,mode,running,restart:()=>{throw Error('Unexpected restart');}}),false);assert.equal(c.isCheckmate(),true);}
c=new Chess();assert.equal(continueMatch({chess:c,mode:'watch',running:true,restart:()=>{throw Error('Early restart');}}),true);
c=new Chess('8/8/8/8/8/8/4k3/7K w - - 0 1');assert.equal(continueMatch({chess:c,mode:'watch',running:true,restart:()=>c.reset()}),true);assert.equal(c.isGameOver(),false);
console.log('PASS: checkmate/draw auto-restart; paused and human modes do not restart; ongoing game preserved');
