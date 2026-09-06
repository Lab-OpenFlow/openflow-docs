# Kubernetes & Helm Deployment

For enterprise high-availability production clusters, OpenFlow provides native Kubernetes manifests in `deployments/k8s/openflow.yaml`.

---

## 1. Deploy to Kubernetes

```bash
# Apply complete OpenFlow Kubernetes stack
kubectl apply -f deployments/k8s/openflow.yaml
```

## 2. Manifest Breakdown

The manifest provisions:
- `Deployment/openflow-orchestrator`: Scalable engine replicas with liveness and readiness probes (`/health`).
- `Service/openflow-service`: ClusterIP / LoadBalancer exposing HTTP port `8080` and WebSocket streams.
- `ConfigMap/openflow-config`: Distributed broker endpoints and OpenTelemetry collector configs.
- `Secret/openflow-secrets`: AES-GCM Vault master encryption keys and database credentials.
