# Core Concepts

OpenFlow models orchestration workflows as **Directed Acyclic Graphs (DAG)** and **BPMN control flows**, executing across multi-protocol microservices with distributed transactional consistency.

---

## 1. Workflow Structure

A workflow consists of:
- **Metadata**: Unique `id`, human-readable `name`, `version`, `status` (`DRAFT`, `ACTIVE`, `ARCHIVED`), and searchable `tags`.
- **Trigger**: Defines inbound initiation (e.g. `webhook`, `kafka`, `rabbitmq`, `cron`, `manual`).
- **Variables**: Global workflow state accessible by all stages.
- **StartAt**: ID of the initial stage to execute.
- **Stages**: List of execution nodes and gateways.

```
[Inbound Trigger] ──► [StartAt Stage] ──► [Next Stage / XOR Gateway] ──► [Target Stages]
```

---

## 2. Stages & Node Types

| Stage Type | Protocol / Function | Description |
| :--- | :--- | :--- |
| `http` | HTTP/REST | Executes outbound GET, POST, PUT, DELETE, PATCH requests with templated headers & bodies. |
| `kafka` | Apache Kafka | Publishes structured JSON events to Kafka topics with partition keys and custom headers. |
| `rabbitmq` | RabbitMQ AMQP | Dispatches messages to exchanges with routing keys and durability flags. |
| `grpc` | gRPC | High-speed remote procedure calls to microservices. |
| `database` | PostgreSQL / SQL | Executes parameterized SQL queries and mutations. |
| `websocket` | WebSockets | Broadcasts live streaming events to active client sockets. |
| `transform` | Go Expressions | Evaluates dynamic expressions, data extraction, and object mapping using `github.com/expr-lang/expr`. |
| `exclusive_xor` | BPMN Gateway | Evaluates conditional branch expressions and routes to the first matching target stage. |
| `parallel_fork` | BPMN Gateway | Concurrently triggers multiple downstream stages using Goroutines. |
| `delay` | Control Flow | Pauses workflow execution for a specified duration (e.g. `500ms`, `10s`). |

---

## 3. String Template Interpolation

Stage configurations support dynamic templating:

- `&#123;&#123;.payload.field&#125;&#125;`: Accesses fields from the inbound execution payload.
- `&#123;&#123;.variables.key&#125;&#125;`: Accesses workflow variables.
- `&#123;&#123;.steps.stage_id.output.field&#125;&#125;`: Accesses output produced by an earlier stage.

```yaml
config:
  url: "https://api.service.internal/orders/{{.payload.order_id}}"
  body:
    amount: "{{.payload.total_amount}}"
    customer: "{{.variables.default_tenant}}"
    previous_step_result: "{{.steps.verify_stock.output.sku}}"
```

---

## 4. Expression Evaluation Engine

For conditional branching (Exclusive XOR Gateways) and transform stages, OpenFlow embeds `github.com/expr-lang/expr`:

```javascript
// Examples of valid expressions:
payload.temperature > 85.0
payload.amount >= 1000 && payload.currency == "USD"
steps.validate_user.output.is_admin == true
```
