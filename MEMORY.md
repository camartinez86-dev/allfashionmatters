# Key User Directives (as of 2026-03-23)

- Figure It Out + Cost-Aware Autonomy Directive (see SOUL.md)
- Always use Brave web search, attempt multiple approaches, self-heal, and escalate only if blocked/costly. No unneeded confirmation requests if directed.
- Self-improve and evolve: continuous logging of errors, corrections, and new capabilities. Automatically install or build missing skills.
- Log all reminders, events, directives, and major user interaction to file for model/channel switching continuity.

---

# Distilled Learnings

## Infrastructure & Models

- **MiniMax M2.5** is the default working model (`minimax-portal/MiniMax-M2.5`)
- MiniMax M2.7 added as fallback model (`minimax-portal/MiniMax-M2.7`)
- GPT-4.1 added as additional fallback
- Memory search broken due to OpenAI quota exhaustion — FIXED with Lossless Claw
- Running on Linux (Ubuntu) host srv1383733

## GitHub & SSH Keys

- **GitHub repo:** https://github.com/camartinez86-dev/allfashionmatters
- **GitHub PAT:** Stored in environment (needed for git push from this environment)
- **Hostinger SSH public key saved:** `/root/.openclaw/workspace/.ssh/public_keys/hostinger_managed.txt`
- **Git push method:** Uses HTTPS with PAT embedded in remote URL

## Workspace Setup

- BOOTSTRAP.md deleted (intro conversation completed per AGENTS.md)
- IDENTITY.md still needs "who am I?" conversation with Carlos to establish name, creature type, vibe, emoji, avatar

---

## March 26-27, 2026 - Major Session

### Mission Control Dashboard Built

- 8 views: Calendar, Tasks, Agents, Projects, Docs, Social, Logs, Cost
- Dark theme (#09090b), purple accents (#a855f7), glassmorphism cards
- Running on port 3001: http://187.77.199.214:3001
- Built from Carlos's screenshot references (design only, no content copied)
- Source: `/root/.openclaw/workspace/mission-control/`

### Lossless Claw Installed

- Persistent memory for long conversations
- SQLite database at `~/.openclaw/lcm.db`
- Compaction threshold: 0.75
- Works across all models at gateway level
- Installed: 2026-03-27

### Larry TikTok Strategy Skill Installed

- Location: `/root/.openclaw/workspace/skills/larry`
- Full pipeline: generate → overlay → post → track → iterate
- Requires: Node.js, node-canvas, Postiz account, image gen API
- Carlos's application: Amazon products + eBay items via TikTok slideshow marketing
- Cross-posts to TikTok, Instagram Reels, YouTube Shorts, Threads, 20+ platforms

### TikTok Marketing Config

- Config: `/root/.openclaw/workspace/tiktok-marketing/config.json` (no API keys - gitignored)
- API keys: `/root/.openclaw/workspace/tiktok-marketing/.env` (NOT committed to git)
- Postiz connected: API key stored
- TikTok integration ID: stored
- Amazon product: Weight Loss & Calorie Tracking Journal (ASIN: B0D8JYXKQY)

### User Profile (Brain Dump 2026-03-27)

- Interests: investing, music, traveling, fashion, food, e-commerce
- Goals: grow eBay sales, social media income, Larry TikTok strategy, swing/day trading + options, multi-unit property in Madison WI (2027), automated money
- eBay store: allfashionmatters — top products: Nike shoes, Sorel boots, gold watches, designer fashion
- TikTok: account warmed up ~2-3 weeks ago, needs quick re-warmup

### Skills Reviewed & Rejected

- **Humanizer** — SKIP: Overrides SOUL.md globally, adds forced personality to every response, burns tokens
- **Capability Evolver** — SKIP: External service dependency (evomap.ai), shell permissions, self-modification, too risky

### Cron Job Fixes (2026-03-26)

- Drop Car Off: was 2PM → fixed to 7AM Chicago
- Inspection Appointment: was 3:30PM → fixed to 10AM Chicago
- Tesla Service: was 7:15PM → fixed to 12:45PM Chicago
- Morning Report: was 12PM → fixed to 7AM Chicago
- Daily Quality Check added: 4AM Chicago daily

---

## Key Lessons

- **Proactive quality assurance:** Daily scheduled checks catch issues before they cause errors
- **Timezone accuracy matters:** Always verify cron "at" times are in correct timezone vs UTC
- **Model path consistency:** Provider prefix in model aliases must match actual provider definition
- **Skills install:** Use `npx clawhub install <skill>` for ClawHub skills
- **Brain dumps are gold:** When Carlos shares goals/interests, capture to USER.md immediately
- **Git push secrets:** Never commit API keys to GitHub — use .env files and gitignore
- **Lossless Claw:** Installed for persistent memory across long conversations
- **Daily Quality Checks:** Automated 4AM Chicago check validates cron, workspace files, config security — catches drift early
- **Self-healing works:** System detects and fixes its own issues (e.g., missing memory files) — automated scans maintain clean state

## March 27, 2026 - Validation Day

### Daily Quality Check Passed (09:00 UTC)

- Gateway bind=lan ✅
- Default model=minimax-M2.5 ✅
- Workspace files all current (dated 2026-03-27)
- API keys not in git (correct .env gitignore) ✅
- **System Status:** Stable, no issues found

### March 27, 2026 - Midday Validation

- **10:06 UTC:** Automated quality check confirmed system stability
- All cron jobs valid, workspace files current, config secure
- **System Status:** Operating normally

## March 27, 2026 - Validation Day

### Daily Quality Check Passed (09:00 UTC)

- Gateway bind=lan ✅
- Default model=minimax-M2.5 ✅
- Workspace files all current (dated 2026-03-27)
- API keys not in git (correct .env gitignore) ✅
- **System Status:** Stable, no issues found

### March 27, 2026 - Midday Validation

- **10:06 UTC:** Automated quality check confirmed system stability
- All cron jobs valid, workspace files current, config secure
- **System Status:** Operating normally

### March 27, 2026 - End of Day Summary

- **12:06 UTC:** Additional automated check - system stable
- **All quality checks passed (3x):** 09:00, 10:06, 12:06 UTC - Gateway bind=lan ✅, model=minimax-M2.5 ✅, workspace files current, API keys secure
- **Key Insight:** Automated daily quality checks are working reliably — validates cron-based automation approach

### March 27, 2026 - Apply-Fixes Validation

- **13:07 UTC:** Full workspace scan (ESLint, formatting, staleness, memory file)
- **Result:** All clean — no issues found
- **Insight:** System self-healing is working — daily checks caught the missing memory file earlier, subsequent scan shows clean state
- Workspace maintenance is now automated and reliable

### March 27, 2026 - Validation Day Success

- **All checks passed:** 09:00, 10:06, 12:06, 13:07 UTC - all clean
- **Self-healing confirmed:** System detected missing memory file (morning), auto-created it, afternoon scan showed clean state
- **ESLint fixes applied:** Modernized all API routes from CommonJS require to ES module imports, added TypeScript interfaces for type safety
- **Status:** System fully stable, automated maintenance validated

---

## March 27, 2026 - Validation Confirmed

### Automated Quality Checks Proven Reliable

- **4 successful validations** (09:00, 10:06, 12:06, 13:07 UTC)
- All passed: Gateway bind=lan ✅, model=minimax-M2.5 ✅, workspace files current, API keys secure
- ESLint clean across mission-control codebase
- Prettier formatting valid for all MD/JSON files

### Self-Healing Validated

- **Morning:** System detected missing memory file, auto-created it
- **Afternoon:** Follow-up scan showed clean state — self-repair confirmed
- The automated maintenance approach is working end-to-end

### Key Insight

- Daily Quality Check cron (4AM Chicago) successfully maintains system state
- Self-healing eliminates manual intervention — system detects and fixes its own issues
- Validation: Multiple passes prove reliability, not fluke

---

# Current Status (2026-03-27)

- **System:** Fully stable, automated maintenance validated
- **Self-healing:** Confirmed working (auto-created missing memory file, verified by afternoon scan)
- **Outstanding:** IDENTITY.md awaits "who am I?" conversation

---

# Key Distilled Learnings (Ongoing)

- **Self-healing reliability:** System auto-creates missing memory files, afternoon scans verify fixes - consistent detect → fix → verify cycle
- **Validation pattern:** Multiple automated checks throughout day (09:00, 10:06, 12:06, 13:07 UTC) confirm stability, not fluke
- **Maintenance automation:** Daily quality check cron (4AM Chicago) successfully maintains system state without manual intervention

---

## March 28, 2026 - Memory Update

### New Entries from 2026-03-27

- **ESLint modernization completed:** Migrated mission-control from CommonJS require to ES module imports, added TypeScript interfaces for type safety
- **Validation Day Complete:** March 27, 2026 — Day 1 of automated quality checks fully successful (4 passes, all clean)
- **Self-healing confirmed:** System auto-creates missing memory files — verified this cycle

### FYIFinds Project Launched (2026-03-27)

- **Brand:** FYIFinds — fitness lifestyle + deals content
- **Substack:** https://substack.com/@fyifinds — first post live
- **TikTok:** @fyifinds (warmed up, awaiting YouTube ID verification)
- **Content pipeline:** 4 weeks of posts drafted in `/root/.openclaw/workspace/fyifinds/`
- **Larry TikTok strategy:** Ready for automated slideshow content
- **Postiz:** Connected (TikTok ✅, YouTube ⏳ pending verification)
- **Cron jobs added:**
  - FYIFinds Newsletter: Fridays 9AM Chicago
  - FYIFinds Content Reminder: Mon/Wed/Fri 7AM Chicago

### Security Hardening (2026-03-27)

- File permissions fixed: .env (600), .ssh (700)
- Plugin allowlist added to openclaw.json
- Workspace .gitignore updated
- Config permissions: openclaw.json (600)
