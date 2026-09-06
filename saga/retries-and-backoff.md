# Retry Policies & Backoff Jitter

OpenFlow provides automatic retry mechanisms for stages susceptible to transient network glitches or external downstream failures.

---

## 1. Retry Algorithms

| Backoff Type | Formula / Behavior |
| :--- | :--- |
| `constant` | Retries at a fixed interval (e.g. every `1s`). |
| `linear` | Delay increases linearly: $T = \text{interval} \times \text{attempt}$. |
| `exponential` | Delay increases exponentially with multiplier: $T = \text{interval} \times \text{multiplier}^{\text{attempt}}$. |

---

## 2. YAML Configuration Example

```yaml
- id: "invoke_payment_gateway"
  name: "Charge Customer Card"
  type: "http"
  config:
    url: "https://payments.internal/charges"
  retry:
    max_attempts: 5
    backoff: "exponential"
    initial_interval: "500ms"
    max_interval: "10s"
    multiplier: 2.0
```
