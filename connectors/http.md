# HTTP / REST Connector

The **HTTP Connector** (`http`) performs outbound REST API calls across microservices and external webhooks.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `url` | `string` | **Yes** | Destination HTTP/HTTPS endpoint. Supports string interpolation `&#123;&#123;...&#125;&#125;`. |
| `method` | `string` | No | HTTP verb: `GET`, `POST`, `PUT`, `DELETE`, `PATCH` (default: `POST`). |
| `headers` | `map[string]string` | No | Request headers. Supports token and expression interpolation. |
| `body` | `object` | No | JSON body payload sent with POST, PUT, PATCH requests. |

---

## 2. Example Stage

```yaml
- id: "charge_payment"
  name: "Charge Credit Card Gateway"
  type: "http"
  config:
    url: "https://payments.gateway.internal/v1/charges"
    method: "POST"
    headers:
      Authorization: "Bearer {{.variables.api_secret}}"
      Content-Type: "application/json"
    body:
      order_id: "{{.payload.order_id}}"
      amount: "{{.payload.total_amount}}"
```
