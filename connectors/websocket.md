# WebSocket Real-Time Stream Connector

The **WebSocket Connector** (`websocket`) pushes live streaming updates to connected frontend clients and dashboard subscribers.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `channel` | `string` | No | Topic channel for client subscriptions. |
| `payload` | `object` | No | Custom JSON payload to broadcast. |

---

## 2. Example Stage

```yaml
- id: "broadcast_order_update"
  name: "Broadcast Order Status via WebSocket"
  type: "websocket"
  config:
    channel: "orders.live"
    payload:
      order_id: "{{.payload.order_id}}"
      status: "COMPLETED"
      updated_at: "{{.payload.timestamp}}"
```
