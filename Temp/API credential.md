# LLMFeed Extensions

## MCP Service Access Credential (proposed)

### Introduction

This extension introduces the concept of a **Service Access Credential** for MCP servers. It allows a human user to securely provide an API key or credential to an LLM agent, binding that credential explicitly to the MCP origin and allowing verifiable delegation.

This creates a trustable, auditable and minimal standard for LLM-to-server secure delegation.

### Use Case

An LLM agent wants to access private APIs of an MCP server (`https://provider.org`).
The user provides a signed JSON credential file that includes:

- The MCP origin (`mcp_origin`)
- An `api_key` or equivalent credential
- Optionally: scopes, expiration date
- A cryptographic signature binding the credential to the domain

The agent can verify:

- The file comes from `https://provider.org`
- The key belongs to this domain (anti-replay)
- The signature is valid (trust model)

### JSON Schema Example

```json
{
  "feed_type": "mcp-api-credential",
  "issued_to": "user@example.com",
  "issued_by": "https://provider.org",
  "public_key_hint": "https://provider.org/.well-known/public.pem",
  "mcp_origin": "https://provider.org",
  "api_key": "abcd1234-secret",
  "scopes": ["read", "write"],
  "expires_at": "2025-12-31T23:59:59Z",
  "signature": {
    "algorithm": "ed25519",
    "signed_blocks": [
      "mcp_origin",
      "api_key",
      "scopes",
      "expires_at"
    ],
    "signature": "base64-signature"
  }
}
```

### Requirements

- `feed_type = "mcp-api-credential"`
- `mcp_origin` must match the active MCP server
- signature must validate using the public key of the provider (`public_key_hint`)
- `expires_at` must be checked for validity

### Security Principles

- **Domain binding**: agent cannot replay the file on another domain.
- **User control**: the file can be revoked (if server maintains an optional revocation list).
- **Optional scopes**: allows future extensions for fine-grained rights.

### LLM Usage Pattern

1. Agent receives `mcp-api-credential.json`
2. Verifies signature and binding to `mcp_origin`
3. Stores credential internally, uses it only for `https://provider.org`

### Status

`Draft - Recommended for future MCP v2 or as extension proposal in LLMFeedForge`.
