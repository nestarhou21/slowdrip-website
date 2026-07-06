/**
 * Media pipeline: raw files from ../assets/asset → optimized web files in public/asset.
 *
 * Usage:  node scripts/process-assets.mjs [images|videos|all]
 *
 * Images: resized to max 1600px wide, converted to mozjpeg q78.
 * Videos: converted to H.264 mp4 (max 720px wide, crf 28, faststart)
 *         plus a .jpg poster frame extracted for each. 720p halves the
 *         file size vs 1080p and is plenty for the phone-sized reel cards.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAW_ROOT = path.resolve(import.meta.dirname, '../../assets/asset');
const OUT_ROOT = path.resolve(import.meta.dirname, '../public/asset');

// source subfolder → destination subfolder
const IMAGE_JOBS = [
  { from: 'photoshoot_outdoor', to: 'photoshoot_outdoor' },
  { from: 'herosection', to: 'herosection' },
  { from: 'redesign', to: 'redesign' },
];
const VIDEO_JOBS = [{ from: 'video', to: 'video' }];

// files whose name starts with "kny" get routed into their own campaign folder
const KNY_DEST = 'kny';

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXT = new Set(['.mov', '.mp4', '.m4v']);

const normalize = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-');

function destFor(job, file) {
  const base = normalize(path.parse(file).name);
  const folder = base.startsWith('kny') ? KNY_DEST : job.to;
  const dir = path.join(OUT_ROOT, folder);
  mkdirSync(dir, { recursive: true });
  return { dir, base };
}

function listFiles(sub, extSet) {
  const dir = path.join(RAW_ROOT, sub);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => extSet.has(path.extname(f).toLowerCase()));
}

async function processImages() {
  for (const job of IMAGE_JOBS) {
    for (const file of listFiles(job.from, IMAGE_EXT)) {
      const src = path.join(RAW_ROOT, job.from, file);
      const { dir, base } = destFor(job, file);
      const out = path.join(dir, `${base}.jpg`);
      await sharp(src)
        .rotate() // respect EXIF orientation
        .resize({ width: 1600, withoutEnlargement: true })
        .flatten({ background: '#ffffff' }) // PNGs → white backdrop
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(out);
      report(src, out);
    }
  }
}

function processVideos() {
  for (const job of VIDEO_JOBS) {
    for (const file of listFiles(job.from, VIDEO_EXT)) {
      const src = path.join(RAW_ROOT, job.from, file);
      const { dir, base } = destFor(job, file);
      const out = path.join(dir, `${base}.mp4`);
      const poster = path.join(dir, `${base}-poster.jpg`);
      execFileSync('ffmpeg', [
        '-y', '-i', src,
        '-vf', "scale='min(720,iw)':-2",
        '-c:v', 'libx264', '-crf', '28', '-preset', 'medium',
        '-movflags', '+faststart',
        '-c:a', 'aac', '-b:a', '128k',
        '-pix_fmt', 'yuv420p',
        out,
      ], { stdio: ['ignore', 'ignore', 'ignore'] });
      execFileSync('ffmpeg', [
        '-y', '-ss', '1', '-i', out,
        '-frames:v', '1', '-q:v', '4',
        poster,
      ], { stdio: ['ignore', 'ignore', 'ignore'] });
      report(src, out);
    }
  }
}

function report(src, out) {
  const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1);
  console.log(`${path.relative(RAW_ROOT, src)} (${mb(src)}MB) → ${path.relative(OUT_ROOT, out)} (${mb(out)}MB)`);
}

const mode = process.argv[2] ?? 'all';
if (mode === 'images' || mode === 'all') await processImages();
if (mode === 'videos' || mode === 'all') processVideos();
console.log('Done.');
