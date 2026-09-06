# Quickstart Guide

Get up and running with **OpenFlow** in under 2 minutes.

---

## 1. Prerequisites

- **Go 1.22+** (for building from source or running locally)
- **Docker & Docker Compose** (for running the full stack with PostgreSQL, Kafka, RabbitMQ, Jaeger, and Prometheus)
- **Node.js 20+** (optional, only if modifying the Visual Studio UI)

---

## 2. Launching OpenFlow via Docker Compose

Clone the repository and launch the orchestrated environment directly from the project root:

```bash
# Start all OpenFlow services in background
docker compose up -d
```

### Services Started:

| Service | Protocol | Host / Port | Description |
| :--- | :--- | :--- | :--- |
| **OpenFlow Server & Studio** | HTTP / WS | `http://localhost:8080` | Orchestration Engine + Web Studio |
| **Jaeger UI** | HTTP | `http://localhost:16686` | Distributed Tracing Explorer |
| **Prometheus** | HTTP | `http://localhost:9090` | Metrics Collection Server |
| **RabbitMQ Management** | HTTP / AMQP | `http://localhost:15672` | AMQP Message Broker (`guest`/`guest`) |
| **Apache Kafka (KRaft)** | TCP | `localhost:9092` | Event Streaming Platform |
| **PostgreSQL 16** | TCP / SQL | `localhost:5432` | Workflow & Execution Persistent Store |

---

## 3. Using the `openflowctl` CLI

OpenFlow provides a high-performance command-line utility for managing workflows, executing pipelines, and inspecting results.

### Build or Run the CLI

```bash
# Build the binary locally
go build -o openflowctl.exe ./cmd/openflowctl

# Or on Linux / macOS:
go build -o openflowctl ./cmd/openflowctl
```

### Common Commands

```bash
# 1. List deployed workflows
./openflowctl workflow list

# 2. Deploy a new YAML workflow
./openflowctl workflow apply -f examples/01-kafka-transform-http.yaml

# 3. Trigger a workflow execution with JSON payload
./openflowctl workflow run kafka-pipeline -f examples/payload-iot-sensor.json

# 4. List recent workflow execution instances
./openflowctl execution list

# 5. Inspect box-by-box execution steps, inputs, and outputs
./openflowctl execution get <EXECUTION_ID>
```

---

## 4. Visual Studio UI

Open your browser at **[http://localhost:8080](http://localhost:8080)**.

1. **Visual Canvas**: Drag and drop nodes, reposition steps, and inspect dynamic Bézier connections.
2. **Inspector Panel**: Click on any node card to view real-time execution duration, Step IDs, and input/output payloads.
3. **YAML Spec Tab**: Full syntax-highlighted declarative editor with real-time bidirectional canvas synchronization.
4. **Execution History Tab**: Audit log of all previous runs with millisecond precision and Saga rollback tracking.
