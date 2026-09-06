import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/docs/',
  title: 'OpenFlow',
  description: 'High-Performance Distributed & Protocol-Agnostic Workflow Orchestrator for Golang',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#38bdf8' }],
  ],

  themeConfig: {
    siteTitle: '⚡ OpenFlow',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Architecture', link: '/guide/architecture' },
      { text: 'Connectors', link: '/connectors/overview' },
      { text: 'Saga Rollback', link: '/saga/distributed-transactions' },
      { text: 'CLI (openflowctl)', link: '/cli/openflowctl' },
      { text: 'API Reference', link: '/api/rest-and-websocket' },
      { text: 'GitHub', link: 'https://github.com/openflow/openflow' },
    ],

    sidebar: [
      {
        text: '🚀 Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction & Quickstart', link: '/guide/getting-started' },
          { text: 'Core Concepts & BPMN Model', link: '/guide/core-concepts' },
          { text: 'Architecture & Engine Design', link: '/guide/architecture' },
          { text: 'Workflow DSL Specification', link: '/guide/workflow-dsl' },
        ],
      },
      {
        text: '🔌 Connectors & Protocol SDK',
        collapsed: false,
        items: [
          { text: 'Connectors Overview', link: '/connectors/overview' },
          { text: 'HTTP REST Connector', link: '/connectors/http' },
          { text: 'Apache Kafka Connector', link: '/connectors/kafka' },
          { text: 'RabbitMQ AMQP Connector', link: '/connectors/rabbitmq' },
          { text: 'gRPC Protocol Connector', link: '/connectors/grpc' },
          { text: 'Database SQL Connector', link: '/connectors/database' },
          { text: 'WebSocket Stream Connector', link: '/connectors/websocket' },
          { text: 'Go Expression Transform', link: '/connectors/transform' },
          { text: 'Building Custom Go Connectors', link: '/connectors/custom-sdk' },
        ],
      },
      {
        text: '🛡️ Distributed Transactions & Resilience',
        collapsed: false,
        items: [
          { text: 'Saga Pattern & Backward Rollbacks', link: '/saga/distributed-transactions' },
          { text: 'Retry Policies & Backoff Jitter', link: '/saga/retries-and-backoff' },
          { text: 'Idempotency & Error Handling', link: '/saga/idempotency' },
        ],
      },
      {
        text: '🔒 Security & Governance',
        collapsed: false,
        items: [
          { text: 'Secret Vault (AES-GCM 256)', link: '/security/vault-and-encryption' },
          { text: 'JWT Auth & Role-Based Access (RBAC)', link: '/security/auth-and-rbac' },
          { text: 'Centralized Audit Trails', link: '/security/audit-logging' },
        ],
      },
      {
        text: '📊 Observability & Metrics',
        collapsed: false,
        items: [
          { text: 'Prometheus Metrics', link: '/observability/metrics' },
          { text: 'Distributed Tracing (OpenTelemetry & Jaeger)', link: '/observability/tracing' },
        ],
      },
      {
        text: '⚡ CNCF Cloud-Native Architecture',
        collapsed: false,
        items: [
          { text: 'Kubernetes Operator & GitOps', link: '/cncf/kubernetes-operator' },
          { text: 'WebAssembly (WASM) Plugins', link: '/cncf/webassembly-plugins' },
          { text: 'Durable Execution & Replay', link: '/cncf/durable-execution' },
          { text: 'W3C Tracing & CloudEvents v1.0.2', link: '/cncf/cloudevents-and-tracing' },
        ],
      },
      {
        text: '💻 Developer Tools & API',
        collapsed: false,
        items: [
          { text: 'openflowctl CLI Reference', link: '/cli/openflowctl' },
          { text: 'REST API & Webhooks', link: '/api/rest-and-websocket' },
          { text: 'OpenAPI 3.0 Specification', link: '/api/openapi-spec' },
        ],
      },
      {
        text: '☸️ Deployment & Operations',
        collapsed: false,
        items: [
          { text: 'Docker Compose Deployment', link: '/deployment/docker-compose' },
          { text: 'Kubernetes & Helm High Availability', link: '/deployment/kubernetes' },
          { text: 'PostgreSQL Persistence Setup', link: '/deployment/database-persistence' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/openflow/openflow' },
    ],

    footer: {
      message: 'Released under the Apache 2.0 License. Open Source Distributed Orchestration Platform.',
      copyright: 'Copyright © 2026 OpenFlow Project',
    },
  },
});
