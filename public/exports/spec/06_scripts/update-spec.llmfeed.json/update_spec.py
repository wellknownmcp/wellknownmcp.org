from pathlib import Path
import json
import argparse
from datetime import datetime, timezone
import sys

# Config
SPEC_PATH = Path("spec.llmfeed.json")

# === Extensions supportées ===
MD_EXT = ".md"

# === Chargement spec ===
with open(SPEC_PATH, "r", encoding="utf-8") as f:
    spec = json.load(f)

# Arguments
parser = argparse.ArgumentParser(description="Update spec.llmfeed.json from markdown files.")
parser.add_argument("--update-block", type=str, help="Update only one block (folder/block)")
parser.add_argument("--dry-run", action="store_true", help="Show changes without writing file")
parser.add_argument("--output", type=str, help="Output file (default: overwrite spec.llmfeed.json)")
args = parser.parse_args()

# 1️⃣ Met à jour metadata.updated_at
spec["metadata"]["updated_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
print(f"✅ metadata.updated_at -> {spec['metadata']['updated_at']}")

# 2️⃣ Met à jour les .md
def update_block(folder, block_name, block):
    md_path = Path(folder) / f"{block_name}{MD_EXT}"
    if not md_path.exists():
        print(f"⚠️ Missing file: {md_path} → skipped.")
        return
    content = md_path.read_text(encoding="utf-8")
    block["path"] = str(md_path).replace("\\", "/")
    block["content"] = content
    print(f"✅ Updated {folder}/{block_name} (markdown)")

if args.update_block:
    # Mode unitaire
    folder_name, block_name = args.update_block.split("/")
    folder = spec["data"].get(folder_name)
    if not folder:
        print(f"❌ Folder '{folder_name}' not found.")
        sys.exit(1)
    block = folder.get(block_name)
    if not block:
        print(f"❌ Block '{block_name}' not found in folder '{folder_name}'.")
        sys.exit(1)
    update_block(folder_name, block_name, block)
else:
    # Full update
    for folder_name, folder in spec["data"].items():
        for block_name, block in folder.items():
            if block_name.startswith("_"): continue  # Skip _llm_context etc.
            if block.get("filetype") != "markdown": continue  # Ne touche que les markdowns
            update_block(folder_name, block_name, block)

# 3️⃣ Écriture
if args.dry_run:
    print("💡 Dry run: no file written.")
else:
    out_path = Path(args.output) if args.output else SPEC_PATH
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)
    print(f"✅ spec saved to {out_path}")

# 4️⃣ Audit pass
print("\n=== 🔍 Audit des fichiers .md vs spec.data ===")

# Fichiers .md présents
folders_on_disk = [f for f in Path(".").iterdir() if f.is_dir() and f.name[0].isdigit()]
md_files_on_disk = set()
for folder in folders_on_disk:
    for md_file in folder.glob("*.md"):
        md_files_on_disk.add(f"{folder.name}/{md_file.name}")

# Fichiers déclarés dans spec
declared_md_files = set()
for folder_name, folder in spec["data"].items():
    for block_name, block in folder.items():
        if block_name.startswith("_"): continue
        if block.get("filetype") == "markdown":
            declared_md_files.add(block["path"])

# Comparaison
new_files = md_files_on_disk - declared_md_files
missing_files = declared_md_files - md_files_on_disk

has_anomaly = False

if new_files:
    print(f"🆕 Fichiers .md NON déclarés dans spec.data :")
    for f in sorted(new_files):
        print(f"  ➜ {f}")
    has_anomaly = True
else:
    print("✅ Aucun nouveau fichier .md non déclaré.")

if missing_files:
    print(f"\n⚠️ Fichiers référencés mais absents du disque :")
    for f in sorted(missing_files):
        print(f"  ➜ {f}")
    has_anomaly = True
else:
    print("✅ Aucun fichier manquant.")

print("\n=== 📝 Audit terminé ===\n")

# Stop si anomalie
if has_anomaly:
    print("❌ Des anomalies ont été détectées. Veuillez corriger avant de pousser.")
    sys.exit(1)
else:
    print("✅ Audit OK : aucune anomalie détectée. Vous pouvez pousser en toute sécurité.")
