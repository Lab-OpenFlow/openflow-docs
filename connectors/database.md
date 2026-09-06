# Database / SQL Connector

The **Database Connector** (`database`) executes parameterized SQL statements against PostgreSQL, MySQL, and SQLite databases.

---

## 1. Configuration Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `driver` | `string` | **Yes** | SQL driver: `postgres`, `mysql`, `sqlite3`. |
| `dsn` | `string` | **Yes** | Connection string DSN. |
| `query` | `string` | **Yes** | Parameterized SQL query (e.g. `INSERT INTO orders VALUES ($1, $2)`). |
| `params` | `array` | No | List of parameter values mapping to `$1, $2, ...` or `?, ?`. |

---

## 2. Example Stage

```yaml
- id: "persist_order_record"
  name: "Save Order to Database"
  type: "database"
  config:
    driver: "postgres"
    dsn: "postgres://openflow:openflow123@openflow-postgres:5432/openflow_db?sslmode=disable"
    query: "INSERT INTO orders (id, customer, amount) VALUES ($1, $2, $3)"
    params:
      - "{{.payload.order_id}}"
      - "{{.payload.customer_id}}"
      - "{{.payload.total_amount}}"
```
