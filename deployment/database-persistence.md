# PostgreSQL Persistence Setup

OpenFlow uses PostgreSQL as its primary database store with native JSONB indexing.

---

## 1. Environment Variable Configuration

```bash
# Set PostgreSQL DSN
export POSTGRES_DSN="postgres://openflow:openflow123@localhost:5432/openflow_db?sslmode=disable"
```

---

## 2. Auto-Migration & Schema

When `POSTGRES_DSN` is provided, OpenFlow automatically initializes and migrates three core tables on startup:
1. `workflows`: Stores workflow metadata, tags, stages graph, trigger config, and variables.
2. `executions`: Stores execution status, input/output JSONB, step-by-step history, and durations.
3. `audit_logs`: Immutable audit trails for all engine actions.
