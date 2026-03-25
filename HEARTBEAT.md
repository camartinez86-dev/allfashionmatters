# HEARTBEAT.md - Wakeup Protocol

Every time OpenClaw wakes up (heartbeat event), run the following in parallel:

1. Spawn 4 sub-agents:
   • Review past mistakes from all available memory
   • Update and maintain long-term memory (summarize recent lessons)
   • Scan for technical debt/issues in configs or code (workspace)
   • Suggest/apply fixes and improvements

2. After sub-agents finish, aggregate and apply all non-destructive fixes automatically.
3. Log results/improvements to today's memory file (memory/YYYY-MM-DD.md).
4. Optionally, push changes to GitHub if modified.
