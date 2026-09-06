# REST & WebSocket API Reference

The OpenFlow Core server exposes a comprehensive HTTP REST and real-time WebSocket API.

---

## 1. REST API Endpoints

### Workflows API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/workflows` | List all deployed workflows |
| `POST` | `/api/v1/workflows` | Deploy new workflow from YAML or JSON |
| `GET` | `/api/v1/workflows/:id` | Get workflow definition by ID |
| `PUT` | `/api/v1/workflows/:id` | Update existing workflow |
| `DELETE` | `/api/v1/workflows/:id` | Delete workflow definition |
| `POST` | `/api/v1/workflows/:id/execute` | Dispatch execution instance |

### Executions API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/executions` | List executions with filtering and pagination |
| `GET` | `/api/v1/executions/:id` | Get execution instance details & step breakdown |

### Inbound Webhook Ingress

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/webhooks/*path` | Triggers workflow mapped to the webhook route |

---

## 2. WebSocket Real-Time Event Stream

Connect to:
👉 `ws://localhost:8080/api/v1/ws`

### Event Payload Format:
```json
{
  "type": "step.completed",
  "execution_id": "exec_kafka-pipeline_c05725ef",
  "workflow_id": "kafka-pipeline",
  "stage_id": "validate_telemetry",
  "timestamp": "2026-08-29T17:30:00Z",
  "payload": {
    "output": {
      "temp_c": 94.2,
      "is_critical": true
    },
    "duration": 1
  }
}
```
