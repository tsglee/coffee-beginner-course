import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';

const root = new URL('../', import.meta.url);
for (const path of ['index.html', 'sky/index.html']) {
const pageURL = new URL(path, root);
const html = await readFile(pageURL, 'utf8');
const $ = load(html);
const body = $('body').text();
for (const text of ['露露咖啡日記', 'Ruru Coffee Journal', '好好手沖', 'Good Good Pour', 'NT$1,800', '四小時', '零經驗', '林口', '樹林', '土城', 'SOP 學習卡', '講義']) {
  if (!body.includes(text)) throw new Error('Missing course information: ' + text);
}
if (/(6,800|9,800|六小時|最多四人|★★★★★|絕對不失敗|比較四個設計版本)/.test(body)) throw new Error('Outdated or preview-only copy');
if ($('h1').length !== 1 || $('details').length !== 6 || $('.parameter-card').length !== 4 || $('table tbody tr').length !== 4) throw new Error('Incomplete course sections');
const ids = new Set($('[id]').toArray().map(e => $(e).attr('id')));
for (const element of $('[src], [href]').toArray()) {
  for (const attribute of ['src', 'href']) {
    const value = $(element).attr(attribute);
    if (!value) continue;
    if (value.startsWith('/')) throw new Error('Root-relative path is unsafe for project Pages: ' + value);
    if (value.startsWith('./') || value.startsWith('../')) await access(new URL(value, pageURL));
    if (value.startsWith('#') && !ids.has(value.slice(1))) throw new Error('Broken anchor: ' + value);
  }
}
for (const element of $('img').toArray()) if (!$(element).attr('alt')) throw new Error('Missing image description');
for (const element of $('[aria-controls]').toArray()) if (!ids.has($(element).attr('aria-controls'))) throw new Error('Broken control target');
if (/AQ\.[A-Za-z0-9_-]{20,}/.test(html)) throw new Error('Credential in output');
console.log('PASS: ' + path + ': brand, course facts, assets, project paths and accessible controls.');
}
