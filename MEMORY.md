# Key User Directives (as of 2026-03-23)

- Figure It Out + Cost-Aware Autonomy Directive (see SOUL.md)
- Always use Brave web search, attempt multiple approaches, self-heal, and escalate only if blocked/costly. No unneeded confirmation requests if directed.
- Self-improve and evolve: continuous logging of errors, corrections, and new capabilities. Automatically install or build missing skills.
- Log all reminders, events, directives, and major user interaction to file for model/channel switching continuity.

---

# Distilled Learnings

## 2026-03-23

### Model Configuration
- MiniMax M2.5 is the default working model for this deployment
- M2.7 returned model_not_found on direct endpoint - not currently available
- GPT-4.1 was added to models.json as fallback

### Infrastructure
- Memory search functionality is broken due to OpenAI quota exhaustion
- GitHub repo: https://github.com/camartinez86-dev/allfashionmatters
- Host has GitHub token but it's not accessible from this environment

### Environment
- Running on Linux (Ubuntu) host srv1383733
- User: Carlos Martinez (Telegram)

## 2026-03-25

### Session Management
- BOOTSTRAP.md successfully deleted (per AGENTS.md - intro complete)
- HEARTBEAT.md contained a recursive task reference causing issues - fixed
- Heartbeat tasks running smoothly: review-mistakes, update-memory, scan-tech-debt, apply-fixes

### Heartbeat System Active
- Heartbeat tasks now operational: review-mistakes, update-memory, scan-tech-debt, apply-fixes
- System performing self-maintenance during heartbeats

### Workspace Improvements
- IDENTITY.md improved with professional placeholder text
- USER.md enriched with pronouns (He/Him), timezone (America/Chicago), communication preference (direct/efficient)
- All workspace documentation now clean and well-formatted

### Outstanding Items
- IDENTITY.md still empty - needs "who am I?" conversation with human to establish name, creature type, vibe, emoji, avatar
- User timezone now inferred as America/Chicago from cron_jobs.md reference to "2PM Chicago"
