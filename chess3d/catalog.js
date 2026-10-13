import openings from './openings.json' with {type:'json'};
import guided from './lesson-catalog.json' with {type:'json'};
import {Chess} from 'chess.js';
export {openings};
export {moveReason as describe} from './move-reason.js';
export const lessons=[...guided.map(l=>({...l,guided:true,family:l.name,eco:''})),...openings.flatMap(o=>o.lines.map(l=>({id:'line:'+l.id,name:o.name+' — '+l.name,family:o.name,eco:l.eco||o.eco,color:o.color,plan:'Learn the '+l.name+' setup in '+o.name+' and practice its documented replies as '+o.color+'. Move explanations are generated from the position; this variation has no authored strategy notes in the source catalog.',moves:l.moves.map(s=>[s,null]),guided:false})))];
export function filterCatalog({query='',kind='all',side='all',favorites=[]}={}){const q=query.toLowerCase().trim();return lessons.filter(l=>(!q||(l.name+' '+l.eco+' '+l.moves.map(m=>m[0]).join(' ')).toLowerCase().includes(q))&&(kind==='all'||kind==='guided'&&l.guided||kind==='lines'&&!l.guided||kind==='favorites'&&favorites.includes(l.id))&&(side==='all'||l.color===side));}
