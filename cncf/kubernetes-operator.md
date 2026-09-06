# ☸️ Kubernetes Operator & GitOps (openflow.dev/v1alpha1)

OpenFlow provides native **Kubernetes Custom Resource Definitions (CRDs)** and a dedicated **Operator Controller**, allowing engineering and DevOps teams to manage, version, and trigger distributed workflows declaratively via **GitOps (ArgoCD, Flux, or `kubectl`)**.

---

## 📦 CustomResourceDefinitions

OpenFlow installs two core CRDs in your Kubernetes cluster:

1. **`Workflow` (`workflows.openflow.dev`)**: Defines the immutable DAG topology, stages, transitions, saga compensation strategies, and configuration.
2. **`WorkflowRun` (`workflowruns.openflow.dev`)**: Represents an execution instance requested through the cluster, tracking runtime state, durations, step traces, and output payloads.

---

## 🚀 Example: Declarative Workflow Manifest

Save this file as `order-processing-crd.yaml`:

```yaml
apiVersion: openflow.dev/v1alpha1
kind: Workflow
metadata:
  name: order-fulfillment-pipeline
  namespace: default
  labels:
    app.kubernetes.io/managed-by: gitops
    app.kubernetes.io/name: openflow
spec:
  name: "E-Commerce Order Fulfillment"
  version: "v1.2.0"
  startAt: "validate_order"
  sagaStrategy: "parallel"
  stages:
    - id: "validate_order"
      name: "Validate Order Items & Customer"
      type: "transform"
      config:
        mapping:
          order_id: "payload.order_id"
          total_usd: "payload.total_usd"
          approved: "payload.total_usd > 0"
      next:
        - "authorize_payment"
    - id: "authorize_payment"
      name: "Authorize Stripe Payment"
      type: "http"
      config:
        method: "POST"
        url: "https://api.stripe.com/v1/charges"
        body:
          amount: "{{.payload.total_usd}}"
          currency: "usd"
```

Apply directly with `kubectl`:

```bash
kubectl apply -f order-processing-crd.yaml
```

---

## ⚡ Triggering Executions via `WorkflowRun`

To trigger a workflow execution declaratively in Kubernetes, create a `WorkflowRun` resource:

```yaml
apiVersion: openflow.dev/v1alpha1
kind: WorkflowRun
metadata:
  name: order-run-99481
  namespace: default
spec:
  workflowRef: order-fulfillment-pipeline
  idempotencyKey: "order_req_99481_uuid"
  input:
    order_id: "ORD-99481"
    total_usd: 149.99
```

Apply the run:

```bash
kubectl apply -f run.yaml
```

Query execution progress in real time:

```bash
kubectl get workflowruns
```

```
NAME              WORKFLOW                      PHASE       DURATION   COMPLETED_AT
order-run-99481   order-fulfillment-pipeline   Completed   42ms       2026-08-29T18:14:00Z
```

---

## 🛠️ CLI Integration (`openflowctl k8s`)

Export any existing OpenFlow YAML workflow to a Kubernetes CRD:

```bash
openflowctl k8s export -f examples/01-kafka-transform-http.yaml > k8s-pipeline.yaml
kubectl apply -f k8s-pipeline.yaml
```
