(() => {
  'use strict';
  const root = document.documentElement;
  try { if (localStorage.getItem('pure-select-motion') === 'paused') root.dataset.motion = 'paused'; } catch (_) {}
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const stopped = () => reduced.matches || root.dataset.motion === 'paused';
  const selector = '.chapter-heading,.workshop-story-photo,.workshop-story-copy,.lesson-outcomes,.beans-introduction,.service-guides>a,.offering,.purchase-assurance,.dual-closing,.contact-paths article,.inquiry-layout,.support-intro,.brand-intro-heading,.brand-intro-detail,.section-heading,.coffee-card,.catalog-card,.course-preview-photo,.course-preview-copy,.roastery-photo,.roastery-copy,.process-layout,.ritual-copy,.ritual-photo,.faq-heading,.faq-list,.bean-shop-intro,.store-course-bridge,.course-section-heading,.course-module-photo,.course-module-copy,.course-parameter-card,.course-teachers article,.course-materials>div,.course-classroom';
  const seen = new WeakSet();
  const reveal = element => { element.dataset.reveal = 'visible'; observer.unobserve(element); };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
  }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
  function register(element) {
    if (seen.has(element)) return;
    seen.add(element);
    // A restored anchor, keyboard focus or motion preference must never conceal content.
    const rect = element.getBoundingClientRect();
    if (stopped() || rect.top < 0 || element.contains(document.activeElement)) return;
    element.dataset.reveal = 'pending';
    observer.observe(element);
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches(selector)) register(node);
    node.querySelectorAll(selector).forEach(register);
  }
  scan(document.body);
  // Filters and shared-stock updates replace cards; new cards get the same gentle entrance.
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(scan)))
    .observe(document.body, { childList: true, subtree: true });
  const honorPreference = () => {
    if (stopped()) document.querySelectorAll('[data-reveal=pending]').forEach(reveal);
  };
  reduced.addEventListener('change', honorPreference);
  new MutationObserver(honorPreference).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  document.addEventListener('focusin', event => {
    const target = event.target.closest('[data-reveal=pending]');
    if (target) reveal(target);
  });
})();
