import { writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
import { stitchPage } from './site.mjs';
import { course } from '../content/course.mjs';

const $ = load(stitchPage(true));
// GitHub project Pages and a local root both resolve these relative paths.
$('[src], [href]').each((_, element) => {
  for (const attribute of ['src', 'href']) {
    const value = $(element).attr(attribute);
    if (value?.startsWith('/assets/') || value?.startsWith('/images/')) $(element).attr(attribute, '.' + value);
  }
});
$('.footer-inner > a:last-child').attr({ href: course.line, target: '_blank', rel: 'noopener noreferrer' }).html('LINE 詢問開課 <span aria-hidden="true">↗</span>');
$('.footer-bottom > span').eq(1).text('好好手沖 Good Good Pour・新手手沖體驗課');
await writeFile(new URL('../index.html', import.meta.url), $.html());
console.log('Built the selected Stitch design as the public homepage.');
