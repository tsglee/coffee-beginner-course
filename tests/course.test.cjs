const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const window = {};
const context = vm.createContext({window, URL, URLSearchParams, location: {href: 'https://example.com/coffee-beginner-course/courses.html?lang=en', search: '?lang=en', origin: 'https://example.com'}});
for (const file of ['course-data.js', 'en-dictionary.js', 'i18n.js']) vm.runInContext(fs.readFileSync(path.join(root, 'assets', file), 'utf8'), context);
const c = window.COFFEE_COURSE;
const t = window.CoffeeI18n.translate;
function test(label, fn) { fn(); console.log('PASS', label); }

test('imported course preserves tuition, duration, instructors, locations and original LINE destination', () => {
  assert.equal(c.brand, '露露咖啡日記');
  assert.equal(c.english, 'Ruru Coffee Journal');
  assert.equal(c.name, '好好手沖');
  assert.equal(t(c.name), '好好手沖');
  assert.equal(c.priceNumber, 1800);
  assert.equal(c.durationHours, 4);
  assert.equal(c.line, 'https://lin.ee/5bkhZu1');
  assert.equal(c.locations.join(','), '林口,樹林,土城');
  assert.equal(c.parameters.length, 4);
  assert.equal(c.journey.length, 5);
  assert.equal(c.faqs.length, 6);
  assert.ok(c.faqs.some(([,answer]) => answer.includes('不包含贈送器材')));
  assert.ok(c.faqs.some(([,answer]) => answer.includes('阿勳與露露')));
});

test('all imported course prose, FAQ and comparison rows have English translations without changing source content', () => {
  const before = JSON.stringify(c);
  const copy = [c.subtitle, ...c.parameters.flatMap(p => [p.title, p.question, p.description, p.tip, p.alt]), ...c.journey.flat(), ...c.comparison.flat(), ...c.faqs.flat()];
  for (const value of copy) assert.ok(!/[\u4e00-\u9fff]/.test(t(value)), value);
  assert.equal(JSON.stringify(c), before);
});

test('all 12 imported course images match the recorded source checksums', () => {
  const provenance = JSON.parse(fs.readFileSync(path.join(root, 'docs/course-integration-provenance.json'), 'utf8'));
  assert.equal(provenance.assets.length, 12);
  for (const asset of provenance.assets) {
    const bytes = fs.readFileSync(path.join(root, asset.destination));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.destination);
  }
  assert.equal(provenance.assets.filter(a => a.type === 'user-provided real photo').length, 4);
});

test('all existing page shells expose the integrated course and use the Ruru brand', () => {
  for (const file of ['index.html', 'shop.html', 'product.html', 'checkout.html', 'story.html', 'about.html', 'admin-orders.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.ok(html.includes('href="courses.html"'), file);
    assert.ok(html.includes('露露咖啡日記'), file);
    assert.ok(!html.includes('佛我咖啡') && !html.includes('FORWARD'), file);
    assert.ok(!html.includes('一遇') && !html.includes('ENCOUNTER'), file);
  }
  const html = fs.readFileSync(path.join(root, 'courses.html'), 'utf8');
  assert.ok(html.includes('href="shop.html"'));
  assert.ok(html.indexOf('assets/i18n.js') < html.indexOf('assets/courses.js'));
  assert.ok(html.includes('assets/course-data.js'));
});
