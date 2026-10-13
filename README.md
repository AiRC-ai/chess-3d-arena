# Chess 3D Arena

Local-first WebGL chess with solid 3D pieces, opening practice and computer opponents.

## Features
- Real geometry, lighting, shadows, orbit, zoom and board flip.
- Human vs AI and continuous AI vs AI with no artificial move delay.
- 9 guided lessons and all 3,755 catalog variations across 124 opening families.
- Choose-a-move training, explanations, hints, reveal, replay and undo.
- Opening/ECO/move search, side filters and favorites.
- Browser progress, validated JSON backup/restore and PGN export.

## Run
Requires Node.js 22.12+ (or a compatible newer release), npm and a WebGL browser.

```sh
cd chess3d
npm ci
npm run dev
```
Open the local URL printed by Vite.

## Build and optional Python launcher
Python 3 launcher uses only the standard library.

```sh
cd chess3d
npm ci
npm run build
cd ..
python3 chess_3d.py
```
Serves on loopback and opens the browser. Ctrl+C shuts it down.

## Test
```sh
cd chess3d
npm test
npm run build
```
The catalog test replays every stored move and exercises both sides of each practice line.

## Training and limitations
Choose Learn an opening, select a lesson, then select a move button. The lesson opponent follows the documented line. Other legal choices are explained and you can retry. Guided lessons have independently written teaching notes; catalog variations use generated factual descriptions, not expert analysis.

The catalog contains opening sequences, not complete games. Some lines are short or unconventional; inclusion is not an endorsement. The unrestricted AI is a small alpha-beta engine, not Stockfish or unbeatable. Search computation takes time even without artificial pauses.

Progress uses origin-specific browser localStorage. Export it before changing ports, browsers or devices. No external service is required during play.

## Credits

**Lesson and opening-catalog source: [ChessStudio by leglerisaac](https://github.com/leglerisaac/ChessStudio).** The nine guided lesson move sequences and complete opening catalog were adapted from ChessStudio. Thank you to its creator for sharing the project. Explanations here are independently written or generated; ChessStudio is the source for the lesson selection and sequences.

See NOTICE.md. Original app code is ISC licensed; opening data originates from the CC0 Lichess chess-openings dataset via ChessStudio. No ChessStudio SVG assets are included; 3D pieces are procedural geometry.
