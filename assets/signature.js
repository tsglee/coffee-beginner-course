(() => {
  'use strict';
  const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const t = value => window.CoffeeI18n?.translate(value) || value;
  const line = 'https://lin.ee/5bkhZu1';
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const up = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const result = document.getElementById('flavor-result');
  const menu = document.getElementById('journal-bean-menu');
  const controls = [...document.querySelectorAll('[data-taste]')];
  const header = document.querySelector('.journal-header');
  const menuButton = document.querySelector('.journal-menu');
  let selected = '';
  const products = () => window.CoffeeStore.state().products.filter(product => product.active);
  const local = href => window.CoffeeI18n?.localLink(href) || href;

  function closeNavigation(returnFocus = false) {
    header.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', t('開啟選單'));
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', t(open ? '關閉選單' : '開啟選單'));
  });
  document.querySelectorAll('#journal-nav a').forEach(anchor => anchor.addEventListener('click', () => closeNavigation()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) closeNavigation(true);
  });

  function renderMenu(list) {
    menu.innerHTML = list.map(product => `<button class="bean-menu-row" type="button" data-coffee="${e(product.id)}" aria-pressed="${product.id === selected}"><strong>${e(product.name)}</strong><span>${e(product.flavors.join(' / '))}</span>${arrow}</button>`).join('');
    menu.querySelectorAll('[data-coffee]').forEach(button => button.addEventListener('click', () => {
      const coffee = list.find(product => product.id === button.dataset.coffee);
      if (coffee) choose(coffee, true);
    }));
  }
  function setPressed(taste) {
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.taste === taste)));
  }
  function choose(product, animate = false) {
    selected = product.id;
    setPressed(product.flavor);
    const image = product.gallery?.[1] || product.gallery?.[0];
    const imageURL = image && window.CoffeeStore.imageURL(image.src) ? image.src : null;
    const picture = imageURL ? `<figure class="flavor-picture"><img src="${e(imageURL)}" alt="${e(image.alt)}" width="1200" height="800" decoding="async"><figcaption>${e(product.country)} / ${e(product.process)}</figcaption></figure>` : '<div class="flavor-empty"><p>商品圖片暫未提供。</p></div>';
    result.classList.toggle('is-updated', animate);
    result.innerHTML = `${picture}<div class="flavor-copy"><h3>${e(product.name)}</h3><p class="flavor-notes">${e(product.flavors.join(' / '))}</p><p class="flavor-description">${e(product.description)}</p><a class="ink-button" data-line-inquiry="beans" href="${line}" target="_blank" rel="noopener noreferrer">LINE 詢問這款豆${up}</a><a class="plain-link" href="${e(local('product.html?id=' + encodeURIComponent(product.id) + '&design=signature'))}">看豆款與沖煮建議${arrow}</a></div>`;
    menu.querySelectorAll('[data-coffee]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.coffee === selected)));
  }
  function showEmpty(taste) {
    selected = '';
    setPressed(taste);
    result.classList.remove('is-updated');
    result.innerHTML = `<div class="flavor-empty"><h3>這個風味，先和我們聊聊。</h3><p>目前沒有對應的展示豆款。告訴我們你喜歡的味道，透過 LINE 詢問實際供應。</p><a class="ink-button" data-line-inquiry="beans" href="${line}" target="_blank" rel="noopener noreferrer">LINE 買豆諮詢${up}</a></div>`;
    menu.querySelectorAll('[data-coffee]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  }
  function refresh() {
    const list = products();
    const previous = list.find(product => product.id === selected);
    renderMenu(list);
    if (previous || list.length) choose(previous || list.find(product => product.flavor === 'floral') || list[0]);
    else showEmpty('floral');
  }
  controls.forEach(button => button.addEventListener('click', () => {
    const product = products().find(product => product.flavor === button.dataset.taste);
    if (product) choose(product, true);
    else showEmpty(button.dataset.taste);
  }));
  refresh();
  window.addEventListener('coffee:change', refresh);

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      document.querySelectorAll('#journal-nav a').forEach(anchor => {
        if (anchor.getAttribute('href') === '#' + entry.target.id) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
})();
