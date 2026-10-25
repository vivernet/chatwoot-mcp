#!/usr/bin/env python3
"""Smoke test for the local Chatwoot MCP server fork.

Boots dist/index.js against a stub HTTP backend (no real Chatwoot needed),
runs a minimal MCP stdio client, and verifies:
  1. initialize handshake succeeds;
  2. tools/list exposes the new chatwoot_toggle_status tool;
  3. calling chatwoot_toggle_status hits the Chatwoot toggle_status endpoint
     with the right method/path/auth/body and returns a success result.

Usage: python3 tests/mcp_smoke.py [path-to-dist/index.js]
"""
import json
import os
import queue
import subprocess
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

DEFAULT_SCRIPT = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "dist", "index.js"
)
TOGGLE_PATH = "/api/v1/accounts/1/conversations/123/toggle_status"

captured = {}


class StubHandler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _send(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        self._send(200, {"data": {"payload": [], "meta": {}}})

    def do_POST(self):
        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length)
        captured["method"] = "POST"
        captured["path"] = self.path
        captured["auth"] = self.headers.get("api_access_token")
        captured["body"] = json.loads(raw.decode("utf-8")) if raw else {}
        status = captured["body"].get("status", "open")
        self._send(
            200,
            {
                "meta": {},
                "payload": {
                    "success": True,
                    "current_status": status,
                    "conversation_id": 123,
                },
            },
        )


def main():
    script = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SCRIPT)
    srv = ThreadingHTTPServer(("127.0.0.1", 0), StubHandler)
    port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    env = dict(os.environ)
    env.update(
        {
            "CHATWOOT_BASE_URL": f"http://127.0.0.1:{port}",
            "CHATWOOT_API_TOKEN": "test-token",
        }
    )

    proc = subprocess.Popen(
        ["node", script],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
        text=True,
        bufsize=1,
    )

    out_q = queue.Queue()
    err_chunks = []

    def pump(stream, q=None):
        for line in iter(stream.readline, ""):
            if q is not None:
                q.put(line)
            else:
                err_chunks.append(line)

    threading.Thread(target=pump, args=(proc.stdout, out_q), daemon=True).start()
    threading.Thread(target=pump, args=(proc.stderr, None), daemon=True).start()

    seq = 0

    def send(method, params=None, notify=False):
        nonlocal seq
        seq += 1
        msg = {"jsonrpc": "2.0", "method": method}
        if notify:
            msg["params"] = params or {}
        else:
            msg["id"] = seq
            msg["params"] = params or {}
        proc.stdin.write(json.dumps(msg) + "\n")
        proc.stdin.flush()
        return seq

    def resp(expected_id, timeout=20):
        deadline = time.time() + timeout
        while time.time() < deadline:
            try:
                line = out_q.get(timeout=deadline - time.time())
            except queue.Empty:
                break
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except ValueError:
                continue
            if obj.get("id") == expected_id:
                return obj
        raise RuntimeError(
            "no JSON-RPC response (id=%d); stderr:\n%s"
            % (expected_id, "".join(err_chunks))
        )

    try:
        i = send(
            "initialize",
            {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "smoke", "version": "1"},
            },
        )
        r = resp(i)
        assert r.get("result", {}).get("protocolVersion"), r
        send("notifications/initialized", notify=True)

        i = send("tools/list")
        r = resp(i)
        names = [t.get("name") for t in r.get("result", {}).get("tools", [])]
        assert "chatwoot_toggle_status" in names, names
        print("PASS tools/list has %d tools incl chatwoot_toggle_status" % len(names))

        i = send(
            "tools/call",
            {
                "name": "chatwoot_toggle_status",
                "arguments": {
                    "account_id": 1,
                    "conversation_id": 123,
                    "status": "resolved",
                },
            },
        )
        r = resp(i)
        result = r.get("result", {})
        text = result.get("content", [{}])[0].get("text", "")
        assert 'status changed to "resolved"' in text, r
        assert captured.get("method") == "POST", captured
        assert captured.get("path") == TOGGLE_PATH, captured
        assert captured.get("auth") == "test-token", captured
        assert captured.get("body") == {"status": "resolved"}, captured
        print("PASS toggle_status call -> %s" % text)
        print("ALL CHECKS PASSED")
    finally:
        try:
            proc.terminate()
        except Exception:
            pass
        srv.shutdown()


if __name__ == "__main__":
    main()
