# Authentication & Role-Based Access Control (RBAC)

OpenFlow provides JWT (JSON Web Tokens) and API Key authentication with fine-grained Role-Based Access Control (`admin`, `operator`, `viewer`).

---

## 1. User Roles & Permissions Matrix

| Permission | `admin` | `operator` | `viewer` |
| :--- | :---: | :---: | :---: |
| `workflow:read` | ✔ | ✔ | ✔ |
| `workflow:create` | ✔ | ✔ | ✖ |
| `workflow:update` | ✔ | ✔ | ✖ |
| `workflow:delete` | ✔ | ✖ | ✖ |
| `workflow:execute` | ✔ | ✔ | ✖ |
| `execution:read` | ✔ | ✔ | ✔ |
| `audit:read` | ✔ | ✖ | ✖ |

---

## 2. API Key Authentication Header

For automated machine-to-machine invocations:

```bash
curl -X POST http://localhost:8080/api/v1/workflows/kafka-pipeline/execute \
  -H "X-API-Key: openflow-master-key" \
  -H "Content-Type: application/json" \
  -d '{"device_id": "sensor-01", "temperature": 94.2}'
```
