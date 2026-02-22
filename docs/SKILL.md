# Mission Control Dashboard

Unified dashboard for OpenClaw - everything in one place.

## Features

- **📊 Dashboard Overview** - Quick stats, charts, recent activity
- **💰 Token Costs** - Integrated usage tracking (same as usage tracker)
- **✓ Tasks** - Task management with priorities
- **📁 Projects** - Project tracking with progress bars
- **🤖 Agents** - Visual team of AI agents and performance
- **🧠 Memory** - Long-term memory and daily logs
- **📄 Docs** - Core files and skills documentation
- **⚙️ Settings** - Configuration and quick links

## Access

Start the server:
```bash
cd /data/.openclaw/workspace/skills/mission-control && python3 -m http.server 8888
```

Then open: **http://localhost:8888**

Or bind to all interfaces:
```bash
python3 -m http.server 8888 --bind 0.0.0.0
```

## Integration

Links to:
- Usage Dashboard (http://localhost:8080)
- Morning Report System
- All core documents (SOUL.md, MEMORY.md, etc.)
