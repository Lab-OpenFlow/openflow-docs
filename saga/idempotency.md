# Idempotency & Fault Tolerance

To guarantee safe retries across distributed networks, OpenFlow supports **Idempotency Keys** and deduplication.

---

## 1. Idempotency Key Injection

You can attach unique idempotency keys using stage expressions:

```yaml
config:
  headers:
    Idempotency-Key: "{{.payload.order_id}}-{{.steps.stage1.execution_id}}"
```

---

## 2. Crash Recovery & Resumption

When backed by PostgreSQL (`pkg/storage/postgres.go`), every stage outcome is durably committed to disk. If a node fails or crashes, execution state is preserved and queryable.
