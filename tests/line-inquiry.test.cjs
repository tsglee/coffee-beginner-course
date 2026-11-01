const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const window = { addEventListener() {}, CoffeeI18n: { translate: value => value } };
const context = vm.createContext({ window, document: { documentElement: { dataset: {} }, body: { dataset: { page: 'test' } }, querySelectorAll: () => [] }, localStorage: { getItem: () => null }, URLSearchParams });
vm.runInContext(fs.readFileSync(path.join(root, 'assets/catalog-data.js'), 'utf8'), context);
window.CoffeeStore = { state: () => window.COFFEE_SEED, cartDetails: () => ({ count: 0 }) };
vm.runInContext(fs.readFileSync(path.join(root, 'assets/commerce.js'), 'utf8'), context);
for (const product of window.COFFEE_SEED.products) {
  for (const home of [true, false]) {
    const html = window.CoffeeUI.coffeeCard(product, home);
    assert.match(html, /data-line-inquiry="beans" href="https:\/\/lin\.ee\/5bkhZu1"/);
    assert.match(html, /target="_blank" rel="noopener noreferrer"/);
    assert.ok(html.includes('product.html?id=' + product.id));
    assert.ok(!html.includes('checkout.html'));
  }
}
console.log('PASS all five dynamic coffee cards retain product details and direct purchases to the original LINE OA');
for (const name of ['sky', 'sage', 'clay', 'noir', 'cobalt']) {
  const html = fs.readFileSync(path.join(root, 'design-' + name + '.html'), 'utf8');
  assert.ok(html.includes('data-design="' + name + '"'));
  const actions = html.match(/<div class="quiet-hero-actions">([\s\S]*?)<\/div>/)[1];
  assert.equal((actions.match(/href="https:\/\/lin\.ee\/5bkhZu1"/g) || []).length, 2);
  assert.ok(actions.includes('data-line-inquiry="beans"'));
  assert.ok(actions.includes('data-line-inquiry="course"'));
  assert.ok(html.includes('assets/ruru/official-logo.png'));
  assert.ok(html.includes('assets/readability.css?v=20261101-design1'));
}
console.log('PASS five design variants share accessible typography, official logo and two direct LINE actions');
