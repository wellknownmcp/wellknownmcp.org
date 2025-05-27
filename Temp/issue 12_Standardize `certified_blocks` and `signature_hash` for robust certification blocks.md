## Proposal: Standardize `certified_blocks` and `signature_hash` for robust certification blocks

We propose introducing two required fields in any `certifications[]` block to make identity-level certification possible, and to clarify the scope of each certification:

---

### ✅ Proposal

#### 1. `certified_blocks: string[]`

- Explicitly lists the feed blocks covered by the certification.
- Must be **identical** to `signed_blocks`, or `signed_blocks + ["signature"]`.
- Prevents ambiguity about what is being certified (content vs content+authorship).

#### 2. `signature_hash: string` (optional except for identity-level certs)

- Contains the `SHA256` hash of the `feed.signature.value`.
- This binds the certification to the exact author signature seen by the certifier.
- Prevents silent tampering or replacement of the `signature` block post-certification.

---

### 🔐 Security Rationale

Including these fields ensures:

- Feed readers and LLMs can **reason about certification scope** and validity.
- Prevents **false implication of identity** when certifying only content.
- Enables trust layering: bronze (content), silver (declared key), gold (identity verified).

---

### 🧪 Example

```json
{
  "certified_blocks": ["origin", "description", "signature"],
  "signature_hash": "SHA256(...feed.signature.value)",
  "owner_key": "base64_author_pubkey",
  "level": "gold",
  "policy_url": "https://llmca.org/policies/gold",
  "value": "base64_llmca_signature",
  "public_key_url": "https://llmca.org/.well-known/public.pem",
  "expires_at": "2025-12-31T00:00:00Z",
  "algo": "ed25519"
}
```

### 🧠 Recommendation

We suggest formalizing `certified_blocks` as a **mandatory field** and `signature_hash` as **required for identity-level certifications (level = "gold")**.

We are open to feedback, alternative naming (`attested_blocks`, etc.), or implementation clarifications.

cc: @wellknownmcp @llmca
