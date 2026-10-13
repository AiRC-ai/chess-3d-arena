// End-of-game routing is separate from rendering and worker scheduling.
export function continueMatch({chess, mode, running, restart}) {
  if (!chess.isGameOver()) return running;
  if (running && mode === 'watch') { restart(); return true; }
  return false;
}
