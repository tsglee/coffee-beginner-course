(() => {
  'use strict';
  if (document.body.dataset.page !== 'contact') return;
  const t = window.CoffeeI18n.translate;
  const topic = document.getElementById('inquiry-topic');
  const order = document.getElementById('inquiry-order');
  const details = document.getElementById('inquiry-details');
  const message = document.getElementById('inquiry-message');
  const status = document.getElementById('inquiry-status');
  const topics = { course: '課程預約', beans: '咖啡豆選購', aftercare: '訂單與退換貨' };
  const hints = { course: '希望日期／地區／人數：', beans: '喜歡的風味／豆款／克數／包數：', aftercare: '商品狀況與需要協助的內容：' };
  const query = new URLSearchParams(location.search);
  if (Object.hasOwn(topics, query.get('topic'))) topic.value = query.get('topic');
  let product;
  try { product = window.CoffeeStore.state().products.find(p => p.id === query.get('product')); } catch (_) {}
  if (product) { topic.value = 'beans'; details.value = t('我想詢問這款咖啡：') + t(product.name); }
  const update = () => {
    const lines = [t('您好，我想詢問：') + t(topics[topic.value])];
    if (order.value.trim()) lines.push(t('訂單編號：') + order.value.trim());
    lines.push('', details.value.trim() || t(hints[topic.value]));
    message.value = lines.join('\n');
    status.textContent = '';
  };
  document.getElementById('inquiry-form').addEventListener('submit', event => event.preventDefault());
  [topic, order, details].forEach(el => el.addEventListener('input', update));
  topic.addEventListener('change', update);
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = t('已複製，請貼到 LINE 或電子郵件傳送。');
    } catch (_) {
      message.focus(); message.select();
      status.textContent = t('請手動複製已選取的訊息，再貼到 LINE 或電子郵件。');
    }
  });
  update();
})();
