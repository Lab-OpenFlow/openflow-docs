# RabbitMQ AMQP Connector

The **RabbitMQ Connector** (`rabbitmq`) publishes AMQP messages to exchanges, routing messages to durable queues and consumer microservices.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `exchange` | `string` | **Yes** | Destination AMQP exchange name. |
| `routing_key` | `string` | No | AMQP routing key for topic and direct exchanges. |
| `payload` | `object` | No | JSON payload (defaults to stage input). |
| `broker` | `string` | No | Optional AMQP URL override (default is cluster URL). |

---

## 2. Example Stage

```yaml
- id: "notify_dispatch"
  name: "Publish OrderDispatched to RabbitMQ"
  type: "rabbitmq"
  config:
    exchange: "ecommerce.events"
    routing_key: "orders.dispatched"
    payload:
      order_id: "{{.payload.order_id}}"
      status: "DISPATCHED"
```
