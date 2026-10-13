import assert from 'node:assert/strict';import {Chess} from 'chess.js';import {choose,evaluate} from './ai.js';
assert.equal(evaluate(new Chess()),0);
const defended='4k3/8/2p5/3p4/8/8/3Q4/4K3 w - - 0 1';const m=choose(defended,1).move;assert.notEqual(m.from+m.to,'d2d5');
for(const fen of ['7k/5Q2/6K1/8/8/8/8/8 w - - 0 1','8/8/8/8/8/6k1/5q2/7K b - - 0 1']){const c=new Chess(fen),{move}=choose(fen,1);c.move(move);assert.ok(c.isCheckmate());}
assert.ok(choose(new Chess().fen(),0).move);console.log('PASS symmetric evaluation, defended-capture regression, both-side mate in one, bounded search depth');
