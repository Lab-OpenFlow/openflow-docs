# Distributed Saga Pattern & Backward Rollbacks

OpenFlow implements native support for the **Saga Pattern**, ensuring data consistency across distributed microservices without distributed two-phase commit (2PC) locks.

---

## 1. How Saga Rollback Works

When a workflow executes:
1. Each completed stage that defines a `compensation` block is pushed onto the **Saga Execution Stack** (LIFO).
2. If any subsequent stage fails (e.g. timeout, 500 error, network unreachable), normal progression is stopped.
3. The **Saga Manager** unwinds the stack in reverse order, executing compensating actions for each previously succeeded stage.

```
Execution Phase:
[ Stage 1: Debit Account ] ──► [ Stage 2: Credit Account ] ──► [ Stage 3: Kafka Notification (FAILS) ]
                                                                             │
                                                                             ▼
Rollback Phase (LIFO):                                           [ Unwind Saga Stack ]
[ Compensate 1: Refund Account ] ◄── [ Compensate 2: Revert Credit ] ◄───────┘
```

---

## 2. Defining Compensations in YAML

```yaml
stages:
  - id: "deduct_sender_account"
    name: "Deduct Sender Account Balance"
    type: "transform"
    config:
      mapping:
        sender_debited: true
        amount: "{{.payload.amount}}"
    # Compensating action executed if later stages fail:
    compensation:
      id: "refund_sender_account"
      name: "Compensate: Refund Sender Account Balance"
      type: "transform"
      config:
        mapping:
          action: "REFUND_SENDER"
          account: "{{.payload.sender_id}}"
          amount: "{{.payload.amount}}"
          refunded: true
    next: ["credit_receiver_account"]
```
