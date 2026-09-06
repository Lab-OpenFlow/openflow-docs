# Architecture Overview

OpenFlow is designed as a **modular, concurrent, and protocol-agnostic orchestration engine** written in Golang.

---

## 1. High-Level Architecture Diagram

```
                 ┌──────────────────────────────────────────────┐
                 │       OpenFlow Visual Studio & CLI           │
                 │    (React Canvas / openflowctl CLI)          │
                 └──────────────────────┬───────────────────────┘
                                        │ REST / WebSockets / YAML
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            OpenFlow Core Server                             │
│                                                                             │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │   Gin REST API Engine │  │ WebSocket Live Hub   │  │ Prometheus / OTel│  │
│  └───────────┬───────────┘  └──────────┬───────────┘  └────────┬─────────┘  │
│              │                         │                       │            │
│              ▼                         ▼                       ▼            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                   Workflow Execution Engine (Go)                      │  │
│  │                                                                       │  │
│  │  • Graph Traversal (DAG & BPMN)    • Expression Evaluator (expr-lang) │  │
│  │  • Goroutine Concurrency           • Retry Scheduler & Backoff        │  │
│  │  • Distributed Saga Manager        • Inbound Trigger Listener         │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
│                                      │                                      │
│  ┌───────────────────────────────────┴───────────────────────────────────┐  │
│  │                      Pluggable Connector Registry                     │  │
│  │                                                                       │  │
│  │  [HTTP]  [Kafka]  [RabbitMQ]  [gRPC]  [Postgres]  [WebSocket]  [...] │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
│ PostgreSQL Store      │  │ Apache Kafka Broker   │  │ RabbitMQ AMQP         │
│ (Workflows/Executions)│  │ (Events / Streams)    │  │ (Message Queues)      │
└───────────────────────┘  └───────────────────────┘  └───────────────────────┘
```

---

## 2. Core Subsystems

### 1. Engine (`pkg/engine`)
- **Non-blocking Dispatch**: Dispatches workflow instances in managed goroutines.
- **Context Propagation**: Thread-safe variable environment passing between stages.
- **Saga Rollback Coordinator**: Tracks executed stages in a LIFO stack and invokes compensating actions backwards upon downstream failure.

### 2. Connectors Layer (`pkg/connectors`)
- Pluggable interface (`Connector`) allowing any protocol to implement `Execute(ctx, execCtx, config, input) (output, error)`.
- Connectors can run synchronously or asynchronously with custom timeout deadlines.

### 3. Persistence Store (`pkg/storage`)
- **PostgreSQL Store**: Native PostgreSQL driver (`github.com/lib/pq`) storing workflows, execution steps, and audit logs using PostgreSQL `JSONB` columns.
- **Memory Store**: Concurrent, thread-safe memory storage fallback for development and testing.

### 4. Observability (`pkg/observability`)
- **OpenTelemetry Tracer**: Roots and child spans exported to Jaeger via OTLP (`OTEL_EXPORTER_OTLP_ENDPOINT`).
- **Prometheus Metrics**: Scrape endpoint `/metrics` tracking execution counts, durations, and active gauges.
