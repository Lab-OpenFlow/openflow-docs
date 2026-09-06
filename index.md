---
layout: home

hero:
  name: "OpenFlow"
  text: "High-Performance Distributed Workflow Orchestrator"
  tagline: "Protocol-agnostic Golang engine inspired by BPMN with Goroutines, Distributed Saga Rollbacks, Multi-Protocol Connectors, and Real-Time Visual Canvas."
  image:
    src: /logo.svg
    alt: OpenFlow Orchestrator
  actions:
    - theme: brand
      text: Get Started →
      link: /guide/getting-started
    - theme: alt
      text: Workflow DSL Spec
      link: /guide/workflow-dsl
    - theme: alt
      text: Connectors SDK
      link: /connectors/overview

features:
  - icon: ⚡
    title: Pure Golang Non-Blocking Engine
    details: Built from the ground up in Go using Goroutines and sync primitives for ultra-low latency (<1ms per stage) and massive concurrency.
  - icon: 🔄
    title: Distributed Saga Transactions
    details: Native backward compensation (LIFO) and transactional rollback for multi-service microsegment operations.
  - icon: 🔌
    title: Multi-Protocol Connectors
    details: Seamlessly bridge Kafka, RabbitMQ, HTTP/REST, gRPC, PostgreSQL/SQL, WebSockets, and Go expressions in a single pipeline.
  - icon: 🎨
    title: Visual Studio + Declarative YAML
    details: Live Drag & Drop BPMN canvas with dynamic Bézier routing, node inspector, and bidirectional YAML specification sync.
  - icon: 📊
    title: OpenTelemetry & Prometheus
    details: Built-in OTLP distributed tracing exported to Jaeger and fine-grained Prometheus metrics (/metrics).
  - icon: 🔒
    title: AES-GCM 256 Vault & RBAC
    details: End-to-end secret encryption, tamper-evident audit logs, JWT authentication, and fine-grained API Key permissions.
---

```yaml
# Sample OpenFlow Declarative Workflow
version: "v1"
id: "order-fulfillment-pipeline"
name: "E-Commerce Multi-Protocol Order Pipeline"

trigger:
  type: "rabbitmq"
  queue: "orders.placed"

start_at: "verify_inventory"

stages:
  - id: "verify_inventory"
    name: "Verify Warehouse Stock via gRPC"
    type: "grpc"
    config:
      target: "inventory.internal:50051"
      method: "CheckAndHoldStock"
    compensation:
      id: "release_stock"
      type: "grpc"
      config:
        method: "ReleaseHold"
    next: ["process_payment"]

  - id: "process_payment"
    name: "Charge Customer Credit Card"
    type: "http"
    config:
      url: "https://payments.internal/v1/charges"
      method: "POST"
    retry:
      max_attempts: 3
      backoff: "exponential"
    compensation:
      id: "refund_charge"
      type: "http"
      config:
        url: "https://payments.internal/v1/refunds"
    next: ["emit_kafka_event"]

  - id: "emit_kafka_event"
    name: "Publish OrderDispatched to Kafka"
    type: "kafka"
    config:
      topic: "ecommerce.orders.dispatched"
      key: "{{.payload.order_id}}"
```
