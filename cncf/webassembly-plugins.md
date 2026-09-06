# ⚡ WebAssembly (WASM) Plugin Sandbox Engine

OpenFlow features an embedded, pure Golang **WebAssembly (WASM) Sandbox Runtime**, enabling developers to write high-performance connectors and transformations in **Rust, TypeScript (AssemblyScript), Go, or C** and run them with **Zero-Trust Memory Bounds**.

---

## 🛡️ Zero-Trust Security Guarantees

1. **Linear Memory Isolation**: Each execution runs in a sandboxed memory space (default 16MB ceiling). Memory leaks or illegal pointer access cannot corrupt the orchestrator process.
2. **Execution Deadlines & CPU Safeguards**: Configurable execution timeouts prevent runaway loops or denial-of-service in untrusted plugins.
3. **Pure Go / Zero CGO**: Runs everywhere with zero external shared C library dependencies.

---

## 📝 Configuring the WASM Connector

Use the `wasm` stage type in your workflow YAML:

```yaml
stages:
  - id: "compute_risk_score"
    name: "Calculate Fraud Risk Score (Rust WASM)"
    type: "wasm"
    config:
      file: "/plugins/fraud_detector.wasm"
      function: "calculate_risk"
      timeout: "2s"
      max_memory: 16
    next:
      - "check_risk_threshold"
```

### Passing WASM Binaries via Base64

For serverless deployments where plugins are distributed dynamically:

```yaml
stages:
  - id: "wasm_transform"
    name: "Dynamic WASM Transform"
    type: "wasm"
    config:
      base64: "AGFzbQEAAAAB..."
      function: "transform"
```

---

## 🦀 Example Plugin in Rust

```rust
#[no_mangle]
pub extern "C" fn calculate_risk(input_ptr: *const u8, input_len: usize) -> *mut u8 {
    // Standard JSON ABI input parsing & calculation logic
}
```
