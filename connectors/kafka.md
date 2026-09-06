# Apache Kafka Connector

The **Apache Kafka Connector** (`kafka`) publishes high-throughput events to Kafka clusters, supporting KRaft, auto-topic provisioning, partition routing, and message headers.

---

## 1. Configuration Parameters

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `topic` | `string` | **Yes** | Destination Kafka topic (auto-created if missing). |
| `key` | `string` | No | Partition key for ordered message delivery. |
| `value` | `object` | No | Message payload. If omitted, uses the stage's inbound payload. |
| `headers` | `map[string]string` | No | Key-value pairs attached as Kafka record headers. |
| `brokers` | `array[string]` | No | Optional override of broker endpoints (default is cluster default). |

---

## 2. Example Workflow Stage

```yaml
- id: "publish_telemetry"
  name: "Publish Sensor Telemetry to Kafka"
  type: "kafka"
  config:
    topic: "iot.sensor.telemetry"
    key: "{{.payload.device_id}}"
    headers:
      source_system: "openflow-orchestrator"
      trace_id: "{{.payload.trace_id}}"
    value:
      device_id: "{{.payload.device_id}}"
      temperature_c: "{{.payload.temp_c}}"
      timestamp: "{{.payload.timestamp}}"
```
