# 🛠️ update_spec.py — LLMCA spec.llmfeed.json updater

This script updates the current `spec.llmfeed.json` by:

✅ Refreshing `metadata.updated_at`  
✅ Updating the `content` of each block in `data` according to its `path`  
✅ Leaving `trust`, `signature`, `certification` untouched  
✅ Optionally allowing update of a single block  

---

## 📄 Usage

```bash
# Full update (metadata.updated_at + all data blocks)
python update_spec.py

# Update only one block
python update_spec.py --update-block llmfeed

# Write to another file
python update_spec.py --output spec_test.llmfeed.json

# Dry run (no file written)
python update_spec.py --dry-run
```

---

## 🔍 How it works

- The script loads `spec.llmfeed.json`
- Updates `metadata.updated_at` with current UTC timestamp
- For each block in `data`:
  - It reads the file at `data[block]['path']`
  - It updates `data[block]['content']` with the file content
- If `--update-block` is used, only that block is updated
- Finally, it writes the updated spec

---

## Example structure

```json
{
  "feed_type": "...",
  "metadata": {
    "title": "...",
    "origin": "...",
    "updated_at": "..."
  },
  "trust": { ... },
  "data": {
    "llmfeed": {
      "path": "llmfeed.md",
      "content": "..."
    },
    ...
  },
  "signature": { ... },
  "certification": { ... }
}
```

---

## Notes

- This script **does not modify** `trust`, `signature`, or `certification`.
- It always guarantees `metadata.updated_at` is fresh.
- It is safe to use repeatedly.
