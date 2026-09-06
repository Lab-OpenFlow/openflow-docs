# openflowctl CLI Reference

`openflowctl` is the command-line control tool for the OpenFlow distributed orchestrator.

---

## 1. Global Options

| Flag | Shorthand | Default | Description |
| :--- | :--- | :--- | :--- |
| `--server` | `-s` | `http://localhost:8080` | Target OpenFlow Server URL |
| `--api-key` | `-k` | `openflow-master-key` | Authentication API Key |

---

## 2. Workflow Management Commands

### `workflow list`
Lists all deployed workflow definitions in a formatted ASCII table.

```bash
./openflowctl workflow list
./openflowctl workflow list --json
```

### `workflow apply`
Deploys or updates a declarative YAML workflow specification.

```bash
./openflowctl workflow apply -f ./workflows/order-pipeline.yaml
```

### `workflow run`
Dispatches a workflow execution with custom JSON payload and tracks step-by-step progress.

```bash
# With JSON file
./openflowctl workflow run kafka-pipeline -f ./examples/payload-iot-sensor.json

# With inline JSON string
./openflowctl workflow run kafka-pipeline -d '{"device_id":"sensor-01","temperature":92.5}'
```

---

## 3. Execution History & Forensic Inspection

### `execution list`
Lists executions with filters for workflow ID and execution status.

```bash
# List all executions
./openflowctl execution list

# Filter by workflow ID
./openflowctl execution list -w kafka-pipeline

# Filter by status (COMPLETED, FAILED, COMPENSATED)
./openflowctl execution list -s COMPLETED
```

### `execution get`
Displays the full step-by-step forensic report of an execution by its unique ID.

```bash
./openflowctl execution get exec_kafka-pipeline_c05725ef
```
