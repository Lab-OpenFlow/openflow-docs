# 🔄 Durable Execution & Deterministic Replay

OpenFlow delivers **Durable Execution** modeled after modern event-sourced engines (Temporal/Cadence), ensuring workflows can survive container crashes, Kubernetes pod evictions, and infrastructure restarts without losing state or duplicating external side effects.

---

## 🧠 How It Works: Event Sourced Reconstruction

1. **Normalized Step Logs**: Every stage completion is persisted as an immutable step delta in PostgreSQL (`execution_steps`).
2. **Zero-Side-Effect Replay**: When a crashed workflow resumes, OpenFlow rebuilds the state graph in memory from historical events **without making outbound network calls** for stages that previously succeeded.
3. **Transparent Resumption**: Execution resumes immediately from the first incomplete stage (`NextStageID`).

```
Crash at Step 3
       │
       ▼
[Container Restart] ──► ReconstructState() ──► Replay Step 1 & 2 (In-Memory, 0 Network Calls) ──► Execute Step 3 & 4
```

---

## 🐕 Crash Recovery Watchdog

The OpenFlow engine includes an autonomous background **Recovery Watchdog**:
- Scans on startup and periodically for orphaned executions left in `RUNNING` status.
- Automatically queues deterministic replay resumptions.

---

## 💻 Manual Resumption via CLI

```bash
openflowctl execution resume exec_5c3780d6
```
