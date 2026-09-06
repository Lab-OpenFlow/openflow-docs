# Connectors Overview

OpenFlow decouples business orchestration logic from underlying transport protocols using a pluggable **Connector Architecture**.

---

## 1. Built-in Connectors

| Connector | Type Identifier | Description |
| :--- | :--- | :--- |
| **HTTP / REST** | `http` | Outbound HTTP client supporting GET, POST, PUT, DELETE, PATCH with templated headers & bodies. |
| **Apache Kafka** | `kafka` | Kafka event producer with auto topic creation, custom partition keys, and headers. |
| **RabbitMQ** | `rabbitmq` | AMQP publisher supporting exchanges, queues, routing keys, and persistent delivery. |
| **gRPC** | `grpc` | High-performance RPC invoker for microservices communication. |
| **Database / SQL** | `database` | Parameterized SQL query and mutation executor for PostgreSQL, MySQL, and SQLite. |
| **WebSockets** | `websocket` | Real-time event broadcaster pushing updates to connected frontend clients. |
| **Go Transform** | `transform` | In-memory dynamic expression evaluation, data filtering, and payload mapping. |

---

## 2. Connector Interface Definition (Go)

Every connector implements the standard Go interface:

```go
type Connector interface {
    Type() model.ConnectorType
    Descriptor() model.ConnectorDescriptor
    Validate(config map[string]interface{}) error
    Execute(ctx context.Context, execCtx *ExecutionContext, config map[string]interface{}, input map[string]interface{}) (map[string]interface{}, error)
}
```
