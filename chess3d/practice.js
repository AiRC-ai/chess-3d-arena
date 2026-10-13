import {describe} from './catalog.js';
import {Chess} from 'chess.js';
export class LessonPractice {
  constructor(chess,lessons){this.chess=chess;this.lessons=lessons;this.reset(lessons[0].id);}
  reset(id){this.lesson=this.lessons.find(l=>l.id===id)||this.lessons[0];this.cursor=0;this.attempts=0;this.mistakes=0;this.hintLevel=0;this.chess.reset();this.feedback='Play the lesson move. Select a piece, then its destination.';this.previous=null;const opening=this.reply();if(opening)this.feedback='Opponent: '+opening.san+' — '+opening.why+' Your turn.';}
  get color(){return this.lesson.color==='black'?'b':'w';}
  get done(){return this.cursor>=this.lesson.moves.length;}
  get expected(){return this.done?null:this.lesson.moves[this.cursor];}
  next(){return this.reveal();}
  reply(){let result=null;while(!this.done&&this.chess.turn()!==this.color){const [san,annotation]=this.expected;const why=annotation||describe(this.chess,san);result={move:this.chess.move(san),san,why};this.cursor++;this.previous=result;}return result;}
  attempt(from,to,promotion='q'){
    if(this.done||this.chess.turn()!==this.color)return {ok:false,message:'The lesson is not waiting for your move.'};
    const legal=this.chess.moves({verbose:true}).find(m=>m.from===from&&m.to===to&&(!m.promotion||m.promotion===promotion));
    if(!legal)return {ok:false,message:'That move is illegal. Select a legal destination.'};
    this.attempts++;if(legal.san!==this.expected[0]){this.mistakes++;this.feedback=legal.san+' is legal, but not the move in this lesson. Try again or ask for a hint.';return {ok:false,message:this.feedback};}
    return this.apply(false);
  }
  apply(revealed){const [san,annotation]=this.expected;const why=annotation||describe(this.chess,san);const user={move:this.chess.move(san),san,why};this.cursor++;const reply=this.reply();this.previous=user;this.hintLevel=0;this.feedback=(revealed?'Revealed: ':'Correct: ')+san+' — '+why+(reply?' Opponent: '+reply.san+' — '+reply.why:'');return {ok:true,user,reply,move:reply?.move||user.move,message:this.feedback};}
  reveal(){if(this.done)return null;this.mistakes++;return this.apply(true);}
  hint(){if(this.done)return null;this.hintLevel=Math.min(2,this.hintLevel+1);const probe=new Chess(this.chess.fen()),move=probe.move(this.expected[0]);return {from:move.from,to:this.hintLevel===2?move.to:null,text:this.hintLevel===1?'Look at the piece on '+move.from+'.':this.expected[0]+' — '+(this.expected[1]||describe(this.chess,this.expected[0]))};}
  undo(){if(this.cursor<=(this.color==='b'?1:0)){this.feedback='There is no player move to undo yet.';return;}let target=this.cursor-1;while(target>0&&(target%2===0?'w':'b')!==this.color)target--;const id=this.lesson.id,attempts=this.attempts,mistakes=this.mistakes;this.reset(id);while(this.cursor<target){this.chess.move(this.expected[0]);this.cursor++;}this.previous=null;this.attempts=attempts;this.mistakes=mistakes;this.feedback='Move taken back. Try the lesson move again.';}
}
