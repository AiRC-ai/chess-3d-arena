import assert from 'node:assert/strict';
import {Chess} from 'chess.js';
import {lessons,openings,filterCatalog,describe} from './catalog.js';
import {LessonPractice} from './practice.js';
assert.equal(openings.length,124);assert.equal(lessons.length,3764);assert.equal(new Set(lessons.map(l=>l.id)).size,3764);let plies=0;
for(const l of lessons){const c=new Chess();for(const [san] of l.moves){assert.ok(describe(c,san).length);c.move(san);plies++;}const p=new LessonPractice(new Chess(),lessons);p.reset(l.id);while(!p.done){assert.equal(p.chess.turn(),p.color);const probe=new Chess(p.chess.fen()),m=probe.move(p.expected[0]);assert.ok(p.attempt(m.from,m.to,m.promotion).ok);}assert.equal(p.chess.history().length,l.moves.length);}
assert.equal(filterCatalog({kind:'guided'}).length,9);assert.equal(filterCatalog({kind:'lines'}).length,3755);assert.ok(filterCatalog({query:'B90'}).length);assert.equal(filterCatalog({kind:'favorites',favorites:['italian']})[0].id,'italian');console.log('PASS all 3764 lessons/lines, '+plies+' legal plies, opponent replies, search and filters');
