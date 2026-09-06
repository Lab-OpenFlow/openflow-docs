# Docker Compose Deployment

OpenFlow ships with an all-in-one Docker Compose orchestration stack suitable for development, staging, and edge deployments.

---

## 1. Quick Start

```bash
docker compose up -d
```

## 2. Included Stack Architecture

- `openflow-server`: Core Golang engine, REST API, WebSocket server & Studio web assets.
- `openflow-postgres`: PostgreSQL 16 database holding persistent workflows, execution steps, and audit logs.
- `openflow-kafka`: Apache Kafka cluster in KRaft mode (no Zookeeper required).
- `openflow-rabbitmq`: RabbitMQ 3.13 AMQP broker with Web Management Console.
- `openflow-jaeger`: Jaeger tracing collector with full OpenTelemetry OTLP endpoint.
- `openflow-prometheus`: Prometheus server scraping `/metrics`.
