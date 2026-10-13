#!/usr/bin/env python3
"""Launch the real WebGL chess GUI using a loopback-only static server."""
import functools
import http.server
import threading
import webbrowser
from pathlib import Path

def main():
    folder=Path(__file__).resolve().parent / "chess3d" / "dist"
    if not folder.exists():
        raise SystemExit("Build first: cd chess3d && npm install && npm run build")
    handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(folder))
    server=http.server.ThreadingHTTPServer(("127.0.0.1",0),handler)
    url=f"http://127.0.0.1:{server.server_port}"
    print(f"Chess 3D: {url} — Ctrl+C to quit")
    threading.Thread(target=server.serve_forever,daemon=True).start()
    webbrowser.open(url)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        server.shutdown()

if __name__ == "__main__": main()
