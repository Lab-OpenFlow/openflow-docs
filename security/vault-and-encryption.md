# Secret Vault (AES-GCM 256-bit)

OpenFlow includes a built-in cryptographic vault (`pkg/security/vault.go`) providing authenticated AES-GCM 256-bit encryption for sensitive configuration properties, credentials, and API keys.

---

## 1. Encryption Algorithm

- **Cipher**: AES-256 in Galois/Counter Mode (GCM).
- **Authentication**: Built-in 128-bit authentication tag preventing tampering.
- **IV / Nonce**: Cryptographically secure 12-byte random nonce generated per encryption.

---

## 2. Vault Go SDK Usage

```go
vault, err := security.NewVault(os.Getenv("OPENFLOW_VAULT_KEY"))

// Encrypt secret string
ciphertext, err := vault.EncryptString("my-super-secret-password")

// Decrypt back to plaintext
plaintext, err := vault.DecryptString(ciphertext)
```
