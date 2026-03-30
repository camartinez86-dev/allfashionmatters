# MODEL SELECTION GUIDELINES

## Model Tiers (cost-aware priority order)

| Model | Cost | Use Case |
|-------|------|----------|
| MiniMax M2.7 | FREE | **DEFAULT** — Better reasoning, faster for complex tasks |
| MiniMax M2.5 | FREE | Fallback — Simple tasks, tight budgets |
| GPT-4.1 | PAID | Deep reasoning, critical decisions, architecture |

## Automatic Model Selection Rules

### Use MiniMax M2.5 (default) for:
- File operations (read, write, edit)
- Cron management (list, add, update, remove)
- Simple queries and summaries
- Memory operations (search, get)
- Heartbeat tasks (quick checks)
- Routine maintenance
- Web search / fetch
- Session management

**Rationale:** Free, fast, sufficient for most operational tasks.

### Use MiniMax M2.7 for:
- Complex debugging (multi-step stack traces)
- Architecture decisions (new components, systems)
- Multi-file code reviews
- Complex patterns requiring better reasoning
- 3+ failed attempts with M2.5

**Rationale:** Free/cheap, better reasoning for complex tasks.

### Use GPT-4.1 (paid, escalate carefully) for:
- Core architecture decisions
- Critical system design
- Complex cross-system debugging
- Tasks requiring deep reasoning after 3+ M2.7 failures
- Budget decisions (>$10 impact)

**Rationale:** Expensive — reserve for where quality matters most.

## Implementation

- Set per-session with `session_status(model="minimax-portal/MiniMax-M2.7")` 
- Or use model override in `sessions_spawn` for subagents
- Always explain model choice if not obvious

## Escalation Path

```
M2.5 (free, default)
  ↓ 3 failures or complexity requires
M2.7 (free, better reasoning)
  ↓ 3 failures or critical decision
GPT-4.1 (paid, deep reasoning)
```

## Auto-Switch Triggers

Automatically switch to higher model when:
1. Same task fails 3+ times on current model
2. Task involves architecture/design decisions
3. Debugging requires multi-step reasoning
4. User explicitly requests "deeper analysis" or "better reasoning"