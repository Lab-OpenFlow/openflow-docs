# 🔍 W3C Tracing & CNCF CloudEvents v1.0.2

OpenFlow implements industry-standard observability and event interoperability specifications.

---

## 🌐 CNCF CloudEvents v1.0.2 Specification

All real-time execution events emitted by OpenFlow comply with the **CNCF CloudEvents v1.0.2** specification:

```json
{
  "specversion": "1.0",
  "id": "97a7e8b2-b5f7-4a0b-8d76-cf4c13a290d2",
  "source": "/openflow/engine/workflows/order-fulfillment",
  "type": "io.openflow.step.completed",
  "datacontenttype": "application/json",
  "time": "2026-08-29T18:15:00Z",
  "subject": "executions/exec_99481",
  "data": {
    "amount": 149.99,
    "status": "APPROVED"
  }
}
```

---

## 🔭 W3C Distributed Context Propagation

OpenFlow automatically injects and extracts W3C `traceparent` and `tracestate` headers across all outbound protocol connectors:

| Connector | Context Carrier Format |
|---|---|
| **HTTP / REST** | Request Headers (`traceparent`, `tracestate`) |
| **Apache Kafka** | Record Headers (`kafka.Header{Key: "traceparent"}`) |
| **RabbitMQ** | AMQP Headers Table (`Headers["traceparent"]`) |

Distributed traces seamlessly link workflow stages in **Jaeger, Grafana Tempo, and OpenTelemetry Collectors**.
