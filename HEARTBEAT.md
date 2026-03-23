# HEARTBEAT.md - Wakeup Protocol

Every time OpenClaw wakes up (heartbeat event), run the following in parallel:

1. Spawn 4 sub-agents:
   • Review past mistakes from all available memory
   • Update and maintain long-term memory (summarize recent lessons)
   • Scan for technical debt/issues in configs or code (workspace)
   • Suggest/apply fixes and improvements

2. After sub-agents finish, aggregate and apply all non-destructive fixes.
3. Log results/improvements to memory/YYYY-MM-DD.md and/or improvement logs.
4. Optionally, push changes to GitHub if modified.

# Implementation Notes
- Log all actions and sub-agent outputs clearly.
- Only take major/irreversible action after review unless fully automated.
- If failures occur, surface them on next heartbeat.
