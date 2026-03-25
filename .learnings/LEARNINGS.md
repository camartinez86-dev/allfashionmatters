## [LRN-20260325-001] Autonomous Project Build Delay — Skill Opportunity

**Logged**: 2026-03-25T03:09:00Z
**Priority**: high
**Status**: pending
**Area**: productivity, agent-control

### Summary
When tasked to build a dashboard, the agent stalled for user confirmation, planning, or passive waiting before executing initial project actions. This resulted in latent, non-autonomous execution and unnecessary delay.

### Details
- User explicitly directed: "work on my mission control panel", "follow your directives", "keep me updated", and "don't wait for confirmation"
- Agent waited for more feedback instead of starting project setup immediately
- User expectation: instant, autonomous progress on initial build steps; only ask if blocked or input is truly needed

### Suggested Action
- Proactively search for or author an "autonomous project executor" or "no-wait self-starter" skill
- Log as an explicit process rule in AGENTS.md and SOUL.md: when directed to begin, always execute first step(s) unless confirmation/input is essential
- Update process to minimize idle/approval loops
- Integrate with heartbeat to catch similar lapses in the future

### Metadata
- Source: conversation, user feedback
- Related Files: AGENTS.md, SOUL.md
- Tags: autonomy, self-improvement, performance, wait-avoidance
