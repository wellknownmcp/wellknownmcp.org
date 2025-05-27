// libs/getWellKnownLinks.ts
import fs from 'fs';
import path from 'path';

export function getWellKnownLinks(): { label: string; href: string }[] {
  const dir = path.resolve(process.cwd(), 'public/.well-known');
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isFile())
    .map(file => ({
      label: file, // ou un mapping plus joli si besoin
      href: `/.well-known/${file}`
    }));
}
