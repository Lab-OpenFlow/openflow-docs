# Distributed Tracing (OpenTelemetry & Jaeger)

OpenFlow integrates the **OpenTelemetry Go SDK** with OTLP HTTP trace exporting directly to **Jaeger**.

---

## 1. Tracing Hierarchy

Every execution produces a structured span hierarchy:

```
[ Root Span: Workflow: kafka-pipeline ]
   │
   ├── [ Child Span: Stage: Validate Telemetry Payload (transform) ]
   ├── [ Child Span: Stage: Check Critical Threshold (exclusive_xor) ]
   └── [ Child Span: Stage: Archive Telemetry Record in DB (database) ]
```

And for failed executions with Saga Rollbacks:

```
[ Root Span: Workflow: financial-transfer-saga (Error) ]
   │
   ├── [ Child Span: Stage: Deduct Sender (transform - OK) ]
   ├── [ Child Span: Stage: Credit Receiver (transform - OK) ]
   ├── [ Child Span: Stage: Publish Event (kafka - FAILED) ]
   │
   ├── [ Child Span: Compensate: Revert Receiver Credit (transform - OK) ]
   └── [ Child Span: Compensate: Refund Sender Balance (transform - OK) ]
```

---

## 2. Exploring in Jaeger UI

1. Open Jaeger UI at **[http://localhost:16686](http://localhost:16686)**.
2. Under **Service**, select `openflow-orchestrator`.
3. Click **Find Traces** to view the timeline, latencies, and span tags.
