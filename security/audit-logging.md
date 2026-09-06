# Centralized Audit Logging

OpenFlow logs tamper-evident audit records into the `audit_logs` table in PostgreSQL for every administrative and execution action.

---

## 1. Audit Log Fields

```json
{
  "id": "audit_8f912a7c",
  "timestamp": "2026-08-29T17:45:00Z",
  "actor": "admin",
  "action": "CREATE_WORKFLOW",
  "resource": "workflow",
  "resource_id": "order-fulfillment-pipeline",
  "details": {
    "version": "v1",
    "stages_count": 4
  },
  "client_ip": "192.168.1.100"
}
```
