#!/usr/bin/env python3
"""
Simple Calendar Server
Serves calendar.html and manages events
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os

EVENTS_FILE = "/data/.openclaw/workspace/calendar/events.json"

class CalendarHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/calendar/events.json':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            if os.path.exists(EVENTS_FILE):
                with open(EVENTS_FILE, 'r') as f:
                    self.wfile.write(f.read().encode())
            else:
                self.wfile.write(b'[]')
        elif self.path == '/calendar':
            self.path = '/calendar.html'
            return SimpleHTTPRequestHandler.do_GET(self)
        else:
            return SimpleHTTPRequestHandler.do_GET(self)
    
    def do_POST(self):
        if self.path == '/save-events':
            length = int(self.headers['Content-Length'])
            body = self.rfile.read(length).decode()
            events = json.loads(body)
            with open(EVENTS_FILE, 'w') as f:
                json.dump(events, f)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'OK')
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    os.makedirs('/data/.openclaw/workspace/calendar', exist_ok=True)
    server = HTTPServer(('0.0.0.0', 8889), CalendarHandler)
    print('Calendar server running on http://localhost:8889/calendar')
    server.serve_forever()
