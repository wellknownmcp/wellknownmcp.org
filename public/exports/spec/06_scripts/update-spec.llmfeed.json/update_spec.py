
from pathlib import Path
import json
import argparse
from datetime import datetime

# Config
SPEC_PATH = Path("spec.llmfeed.json")
DATA_DIR = Path("data")

# Load existing spec
with open(SPEC_PATH, "r", encoding="utf-8") as f:
    spec = json.load(f)

# Setup argument parsing
parser = argparse.ArgumentParser(description="Update spec.llmfeed.json from data/*.md")
parser.add_argument("--update-block", type=str, help="Update only one block (ex: llmfeed)")
parser.add_argument("--dry-run", action="store_true", help="Show changes without writing file")
parser.add_argument("--output", type=str, help="Output file (default: overwrite spec.llmfeed.json)")
args = parser.parse_args()

# 1️⃣ Update metadata.updated_at
spec["metadata"]["updated_at"] = datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
print(f"✅ metadata.updated_at -> {spec['metadata']['updated_at']}")

# 2️⃣ Update data content
def update_block(block_name):
    block = spec["data"].get(block_name)
    if not block:
        print(f"⚠️ Block '{block_name}' not found in data.")
        return
    md_path = DATA_DIR / block["path"]
    if not md_path.exists():
        print(f"⚠️ File '{md_path}' not found for block '{block_name}'.")
        return
    content = md_path.read_text(encoding="utf-8")
    block["content"] = content
    print(f"✅ data['{block_name}']['content'] updated from {md_path}")

if args.update_block:
    # Single block update
    update_block(args.update_block)
else:
    # Full update
    for block_name in spec["data"].keys():
        update_block(block_name)

# 3️⃣ Write result
if args.dry_run:
    print("💡 Dry run: no file written.")
else:
    out_path = Path(args.output) if args.output else SPEC_PATH
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(spec, f, indent=2)
    print(f"✅ spec saved to {out_path}")
