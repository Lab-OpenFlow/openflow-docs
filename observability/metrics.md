# Prometheus Metrics Reference

OpenFlow exposes standard Prometheus metrics at the `/metrics` endpoint.

---

## 1. Metrics List

| Metric Name | Type | Labels | Description |
| :--- | :--- | :--- | :--- |
| `openflow_executions_total` | Counter | `workflow_id`, `status` | Total count of workflow executions by outcome (`COMPLETED`, `FAILED`, `COMPENSATED`). |
| `openflow_execution_duration_seconds` | Histogram | `workflow_id` | End-to-end workflow execution latency. |
| `openflow_stage_duration_seconds` | Histogram | `stage_type`, `status` | Latency distribution of individual connector stages. |
| `openflow_saga_rollbacks_total` | Counter | `workflow_id`, `status` | Number of distributed Saga compensations triggered. |
| `openflow_active_executions` | Gauge | — | Number of concurrently running workflow instances. |

---

## 2. Scraping Configuration (`prometheus.yml`)

```yaml
scrape_configs:
  - job_name: 'openflow'
    scrape_interval: 5s
    static_configs:
      - targets: ['openflow-server:8080']
```
