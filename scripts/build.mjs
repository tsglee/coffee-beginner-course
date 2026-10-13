import { mkdir, writeFile } from 'node:fs/promises';
import { page, stitchPage } from './site.mjs';
import { publicPage } from './public-page.mjs';
import { variants } from '../content/course.mjs';

const root = new URL('../', import.meta.url);
await writeFile(new URL('index.html', root), publicPage(stitchPage(true)));
await mkdir(new URL('sky/', root), { recursive: true });
await writeFile(new URL('sky/index.html', root), publicPage(page(variants.find(v => v.id === 'sky'), true), '..'));
console.log('Built the Stitch homepage and the shareable sky-blue course page.');
