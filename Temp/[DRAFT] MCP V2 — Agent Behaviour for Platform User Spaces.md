## **[DRAFT] MCP V2 — Agent Behaviour for Platform User Spaces**

### **Background**

In many platforms, individual users or organizations do not own full domain control.  
They operate within sub-paths or sub-spaces under a parent platform (e.g. social profiles, marketplace shops, SaaS workspaces).

Example:

perl

CopierModifier

`https://github.com/myuser https://instagram.com/@artist https://notion.so/workspace-xyz`

### **Problem**

Standard `.well-known/mcp` cannot be deployed by these users, making autonomous declarations impossible without platform cooperation.

### **Expected agent behaviour**

When analyzing a resource that appears to belong to a known platform with user-spaces:

**1. Try virtual `.well-known` on user space**

> If the URL pattern permits:

arduino

CopierModifier

`https://platform.com/user-space/.well-known/mcp`

If found, treat it as a valid MCP endpoint and stop.

**2. Fallback to parent platform MCP file**

> Request:

arduino

CopierModifier

`https://platform.com/.well-known/mcp`

If `user_spaces` registry exists, search for a matching `user_url`:

json

CopierModifier

`{   "platform": "platform-name",   "user_spaces": [     {       "user_url": "https://platform.com/myuser",       "mcp_proxy": "https://agents.platform.com/proxy/myuser"     }   ] }`

If found, redirect MCP agent resolution to `mcp_proxy` endpoint.

**3. Optional: user self-hinting (non-standard fallback)**  
If no platform support is found, agent MAY scan user profile description / metadata for an MCP hint:

ini

CopierModifier

`well-known="user" mcp-hint="https://external-domain.com/mcp"`

This MUST NOT be treated as authoritative, only as an optional last resort.

---

### **Summary (flow)**

pgsql

CopierModifier

`User URL → 1. Try user-url/.well-known/mcp → 2. else → platform.com/.well-known/mcp → user_spaces mapping → 3. else → optional MCP hint tag in user bio`

---

### **Rationale**

- Enables large centralized platforms to participate while maintaining user control

- Provides a fallback pathway for decentralized adoption

- Keeps MCP resolution deterministic and extensible

This behaviour SHOULD be implemented by any compliant MCP agent resolver library from MCP V2 onwards.

---

### **Status**

> Draft for inclusion into MCP Agent Behaviour Appendix — V2 roadmap candidate.
