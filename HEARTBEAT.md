# HEARTBEAT.md - Wakeup Protocol

Every time OpenClaw wakes up (heartbeat event), run the following:

## Sub-Agent Tasks

Run these tasks sequentially (OpenClaw handles staggering internally):

1. **Review past mistakes** — Log findings to memory/YYYY-MM-DD.md
2. **Update memory** — Summarize recent lessons to MEMORY.md if significant
3. **Scan tech debt** — Log findings to memory/YYYY-MM-DD.md
4. **Apply fixes** — Apply any non-destructive fixes found, log to memory/YYYY-MM-DD.md

## Process

1. After sub-agents finish, aggregate results
2. Log results/improvements to today's memory file (memory/YYYY-MM-DD.md)
3. Commit and push to GitHub if significant changes were made
