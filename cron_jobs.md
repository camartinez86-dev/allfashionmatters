# Scheduled Cron Jobs (as of 2026-03-27)

See below for current jobs. All future reminders and scheduled tasks are batched here for portability across models.

## Reminders & Scheduling

- **One-time reminders:** Fire 1 hour before event time
- **Recurring reminders:** Fire 1 hour before event time (e.g., HDP Timesheet at 1PM Chicago = due 2PM)
- **Heartbeat:** Sub-agents run sequentially (15s apart) to avoid MiniMax rate limiting

## Active Jobs

- 2026 Payroll Timesheet Due reminders (all future due dates from IRIS schedule)
- Heartbeat self-review and improvement workflow
- Daily GitHub workspace backup (03:00 America/Chicago)
- Calendar event reminders from screenshots
- Weekly Dashboard Auto-Improvement (Sundays 2PM Chicago)

For full detail, use reminder/cron job listing built into OpenClaw or review /.openclaw/gateway/crons.json
