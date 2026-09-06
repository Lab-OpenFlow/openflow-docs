# Workflow DSL Specification

OpenFlow workflows are declared using a clean YAML/JSON format that maps directly to BPMN specifications.

---

## 1. Full Schema Structure

```yaml
version: "v1"                  # DSL Version ("v1")
id: "string"                   # Unique workflow identifier
name: "string"                 # Human readable name
description: "string"          # Optional description
tags: ["string"]               # Searchable tags
status: "ACTIVE"               # "DRAFT" | "ACTIVE" | "ARCHIVED"

# Inbound trigger configuration
trigger:
  type: "webhook"              # "webhook" | "kafka" | "rabbitmq" | "cron" | "manual"
  path: "/webhooks/events"     # Path for Webhook ingress
  topic: "events.incoming"     # Topic for Kafka consumer
  queue: "events_queue"        # Queue for RabbitMQ consumer
  cron: "0 * * * *"            # Standard cron expression
  broker: "kafka:29092"        # Optional broker override

start_at: "stage_id_1"         # Initial stage to execute

variables:                     # Global workflow variables
  environment: "production"
  max_retries: 3

stages:
  - id: "stage_id_1"
    name: "Stage Name"
    type: "http"               # Connector type
    async: false               # If true, runs asynchronously without blocking
    timeout: "10s"             # Stage timeout deadline
    config:
      # Protocol-specific configuration
    retry:
      max_attempts: 3
      backoff: "exponential"   # "constant" | "linear" | "exponential"
      initial_interval: "500ms"
      max_interval: "10s"
      multiplier: 2.0
    compensation:              # Distributed Saga rollback definition
      id: "rollback_stage_1"
      name: "Compensating Action"
      type: "http"
      config:
        # Rollback configuration
    next: ["stage_id_2"]       # Sequential target stages
```

---

## 2. BPMN Gateway Definitions

### Exclusive XOR Gateway (`exclusive_xor`)

Evaluates conditions from top to bottom and routes execution to the first branch that matches.

```yaml
- id: "evaluate_credit_score"
  name: "Evaluate Risk Level"
  type: "exclusive_xor"
  branches:
    - condition: "payload.score >= 750"
      target: "auto_approve_loan"
    - condition: "payload.score >= 600"
      target: "manual_underwriter_review"
    - default: true
      target: "reject_loan_application"
```

### Parallel Fork Gateway (`parallel_fork`)

Triggers multiple independent downstream branches concurrently.

```yaml
- id: "fanout_notifications"
  name: "Send Multi-Channel Alerts"
  type: "parallel_fork"
  next:
    - "send_sms_alert"
    - "send_push_notification"
    - "publish_slack_webhook"
```
