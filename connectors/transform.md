# Go Transform & Expression Connector

The **Transform Connector** (`transform`) performs in-memory evaluations, boolean condition filtering, mathematical calculations, and dynamic payload mapping using `github.com/expr-lang/expr`.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `expression` | `string` | No | Boolean expression to filter or validate input. |
| `mapping` | `map[string]interface{}` | No | Mapping dictionary creating new fields with expressions. |

---

## 2. Example Stage

```yaml
- id: "calculate_totals"
  name: "Transform Telemetry & Compute Conversions"
  type: "transform"
  config:
    expression: "payload.temperature > -50 && payload.temperature < 150"
    mapping:
      device_id: "payload.device_id"
      temp_c: "payload.temperature"
      temp_f: "payload.temperature * 1.8 + 32"
      is_critical: "payload.temperature > 85"
```
