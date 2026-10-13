import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Chess} from 'chess.js';
import {LessonPractice} from './practice.js';
const lessons=JSON.parse(fs.readFileSync(new URL('./lesson-catalog.json',import.meta.url)));
assert.equal(lessons.length,9);
for(const lesson of lessons){const chess=new Chess(),p=new LessonPractice(chess,lessons);p.reset(lesson.id);while(!p.done){assert.equal(chess.turn(),p.color);const probe=new Chess(chess.fen()),m=probe.move(p.expected[0]);assert.ok(p.attempt(m.from,m.to,m.promotion).ok);}assert.equal(chess.history().length,lesson.moves.length);p.undo();assert.equal(p.done,false);assert.equal(chess.turn(),p.color);p.reset(lesson.id);assert.equal(p.cursor,lesson.color==='black'?1:0);console.log('PASS',lesson.name,'practice, opponent replies, undo, replay');}
const c=new Chess(),p=new LessonPractice(c,lessons);const fen=c.fen();assert.equal(p.attempt('d2','d4').ok,false);assert.equal(c.fen(),fen);assert.equal(p.attempt('e2','e5').ok,false);assert.equal(c.fen(),fen);assert.equal(p.hint().from,'e2');assert.equal(p.hint().to,'e4');assert.ok(p.reveal().ok);assert.equal(c.history().length,2);console.log('PASS wrong/illegal moves preserve board; hints/reveal');
