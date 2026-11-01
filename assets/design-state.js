(() => {
  'use strict';
  const allowed = ['sky', 'sage', 'clay', 'noir', 'cobalt', 'signature'];
  const design = document.body.dataset.design || new URLSearchParams(location.search).get('design');
  if (!allowed.includes(design)) return;
  document.body.dataset.design = design;
  // Keep a selected composition's palette while browsing coffee and workshop details.
  // Query parameters preserve the established storage keys and bilingual behavior.
  const update = anchor => {
    const raw = anchor.getAttribute('href');
    if (!raw || raw.startsWith('#')) return;
    const url = new URL(raw, location.href);
    if (url.origin !== location.origin || !url.pathname.endsWith('.html')) return;
    const file = url.pathname.split('/').pop();
    if (file === 'designs.html' || file === 'admin-orders.html') return;
    if (file === 'index.html') url.pathname = url.pathname.replace(/index\.html$/, `design-${design}.html`);
    if (/^design-(sky|sage|clay|noir|cobalt|signature)\.html$/.test(file)) return;
    url.searchParams.set('design', design);
    const next = url.pathname + url.search + url.hash;
    if (raw !== next) anchor.setAttribute('href', next);
  };
  document.querySelectorAll('a[href]').forEach(update);
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.matches('a[href]')) update(node);
      node.querySelectorAll('a[href]').forEach(update);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
