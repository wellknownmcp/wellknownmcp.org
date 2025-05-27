import os
import urllib.request
from PIL import Image
import zipfile
import cairosvg

# CONFIGURATION
INPUT_IMAGE = "input.png"
SVG_DIR = "svg_emojis"  # dossier contenant les .svg
OUTPUT_DIR = "og_adjusted"
ZIP_NAME = "og_images_with_adjusted_margins.zip"
EMOJI_SIZE = (240, 240)
RIGHT_MARGIN = 140
BOTTOM_MARGIN = 58

# Créer le dossier de sortie
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Charger l'image de fond
background = Image.open(INPUT_IMAGE).convert("RGBA")
bg_width, bg_height = background.size

# Parcourir les fichiers SVG
for filename in os.listdir(SVG_DIR):
    if not filename.endswith(".svg"):
        continue

    name = os.path.splitext(filename)[0]
    svg_path = os.path.join(SVG_DIR, filename)
    png_path = os.path.join(SVG_DIR, f"{name}_temp.png")

    # Convertir SVG → PNG
    cairosvg.svg2png(url=svg_path, write_to=png_path, output_width=EMOJI_SIZE[0], output_height=EMOJI_SIZE[1])

    # Charger le PNG
    emoji = Image.open(png_path).convert("RGBA").resize(EMOJI_SIZE, Image.Resampling.LANCZOS)

    # Calcul de la position
    x = bg_width - EMOJI_SIZE[0] - RIGHT_MARGIN
    y = bg_height - EMOJI_SIZE[1] - BOTTOM_MARGIN

    # Coller sur une copie de l'image de fond
    composed = background.copy()
    composed.paste(emoji, (x, y), emoji)

    # Sauvegarde
    output_path = os.path.join(OUTPUT_DIR, f"{name}.png")
    composed.save(output_path)

# Création de l'archive ZIP
with zipfile.ZipFile(ZIP_NAME, 'w') as zipf:
    for f in os.listdir(OUTPUT_DIR):
        zipf.write(os.path.join(OUTPUT_DIR, f), arcname=f)

print(f"✅ Terminé. Archive créée : {ZIP_NAME}")
