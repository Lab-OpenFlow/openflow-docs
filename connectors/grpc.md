# gRPC Protocol Connector

The **gRPC Connector** (`grpc`) enables low-latency RPC invocations across Golang, Java, Python, and Node.js microservices.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `target` | `string` | **Yes** | Host and port of the gRPC server (e.g. `inventory-service:50051`). |
| `service` | `string` | **Yes** | Full protobuf service package and name (e.g. `inventory.WarehouseService`). |
| `method` | `string` | **Yes** | RPC method name (e.g. `CheckAndHoldStock`). |
| `data` | `object` | No | Protobuf request message payload. |

---

## 2. Example Stage

```yaml
- id: "hold_warehouse_stock"
  name: "Verify Warehouse Stock via gRPC"
  type: "grpc"
  config:
    target: "inventory-service.internal:50051"
    service: "inventory.WarehouseService"
    method: "CheckAndHoldStock"
    data:
      sku: "{{.payload.sku}}"
      quantity: "{{.payload.quantity}}"
```
