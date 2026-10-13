import { load } from 'cheerio';
import { course } from '../content/course.mjs';

export function publicPage(html, assetBase = '.') {
  const $ = load(html);
  $('[src], [href]').each((_, element) => {
    for (const attribute of ['src', 'href']) {
      const value = $(element).attr(attribute);
      if (value?.startsWith('/assets/') || value?.startsWith('/images/')) $(element).attr(attribute, assetBase + value);
    }
  });
  $('.footer-inner > a:last-child').attr({ href: course.line, target: '_blank', rel: 'noopener noreferrer' }).html('LINE 詢問開課 <span aria-hidden="true">↗</span>');
  $('.footer-bottom > span').eq(1).text('好好手沖 Good Good Pour・新手手沖體驗課');
  return $.html();
}
