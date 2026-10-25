(() => {
  'use strict';
  const c = window.COFFEE_COURSE;
  const e = window.CoffeeUI.esc;
  const price = 'NT$' + c.priceNumber.toLocaleString('en-US');
  const image = (name, alt, eager = false) => `<img src="assets/courses/${name}.jpg" alt="${e(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const inquire = (label = 'LINE 預約咖啡課程', cls = 'primary-button') => `<a class="${cls}" href="${e(c.line)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
  const chapter = (number, english, title, description) => `<div class="course-section-heading"><p class="section-kicker">${number} / ${english}</p><h2>${title}</h2>${description ? `<p>${description}</p>` : ''}</div>`;
  document.getElementById('course-main').innerHTML = `
    <section class="course-hero" id="course-top" aria-labelledby="course-title">
      ${image('hero-stitch', '細口手沖壺向濾杯注水的課程攝影示意', true)}
      <div class="course-hero-shade"></div>
      <div class="wrapper course-hero-content">
        <p class="course-eyebrow">FORWARD COFFEE / HANDS-ON WORKSHOP</p>
        <p class="course-name">${e(c.name)}</p>
        <h1 id="course-title">從第一杯，<br>沖出自己的好咖啡。</h1>
        <p class="course-hero-lead">${e(c.subtitle)}</p>
        <div class="course-hero-actions">${inquire()}<a class="course-outline-button" href="#learn">看看課程內容 ↓</a></div>
        <p class="course-hero-location">林口／樹林／土城可安排 · 一人也可開班</p>
      </div>
      <div class="course-hero-note"><span>BEGIN WITH CURIOSITY.</span><span>01 / 好好手沖</span></div>
    </section>
    <div class="wrapper course-facts" aria-label="課程重點"><div><span>COURSE FEE</span><strong>${price} <small>／人</small></strong></div><div><span>DURATION</span><strong>四小時</strong></div><div><span>LEVEL</span><strong>零經驗可參加</strong></div><div><span>WITH YOU</span><strong>阿勳 & 露露</strong></div></div>
    <div class="wrapper course-section-nav" aria-label="課程章節"><a href="#learn">你會學到</a><a href="#journey">四小時的旅程</a><a href="#materials">帶回家的方法</a><a href="#teachers">認識講師</a><a href="#course-faq">常見問題</a></div>
    <section id="learn" class="wrapper course-section">
      ${chapter('01', 'LEARN BY DOING', '四小時，把「憑感覺」<br>變成「有方法」。', '先動手，再理解。把每一次沖煮的疑問，變成下一杯的方向。')}
      <article class="course-module"><div class="course-module-photo">${image('sop', '濾杯、濾紙、磨豆機與秤等手沖準備器材')}<span>PREPARE. POUR. TASTE.</span></div><div class="course-module-copy"><p class="section-kicker">01 / YOUR FIRST BREW</p><h3>一套 SOP，<br>讓第一杯有跡可循。</h3><p>從準備到品飲，把手沖拆成清楚的步驟。不需要憑感覺猜，跟著流程，一步一步練習。</p><ol class="course-sop"><li><b>準備與秤量</b><span>認識器材，記錄豆量與水量。</span></li><li><b>研磨與潤濕濾紙</b><span>依器材準備好咖啡粉與濾杯。</span></li><li><b>悶蒸與分段注水</b><span>跟著老師，練習觀察水流與粉床。</span></li><li><b>品飲與紀錄</b><span>記下味道，整理下次可以調整的方向。</span></li></ol><p class="course-takeaway">帶走：一套回家也能照著練的流程</p></div></article>
      <article class="course-module course-module-reverse"><div class="course-module-photo">${image('champion', '細口壺注水至濾杯咖啡粉床的操作示意')}<span>A METHOD WORTH EXPLORING.</span></div><div class="course-module-copy"><p class="section-kicker">02 / A DIFFERENT WAY TO POUR</p><h3>從第一杯，<br>走向冠軍的沖煮思路。</h3><p>練習粕谷哲的 4:6 沖法，用分段注水理解調整方向。先掌握方法，再依豆子與器材找出自己的風味。</p><div class="course-pour-diagram" aria-label="4:6 法將總水量分為前段百分之四十與後段百分之六十"><div><strong>40<small>%</small></strong><span>前段注水</span><p>探索酸甜表現</p></div><div><strong>60<small>%</small></strong><span>後段注水</span><p>探索濃度表現</p></div></div><p class="course-source"><a href="https://www.hario-europe.com/blogs/hario-community/v60-ambassadors-tetsu-kasuya" target="_blank" rel="noopener noreferrer">方法參考：HARIO 粕谷哲官方介紹 ↗</a></p></div></article>
      <div class="course-section-heading course-subheading"><p class="section-kicker">03 / FOUR LITTLE CHANGES</p><h3>四個參數，認識一杯咖啡的變化。</h3><p>一次觀察一個改變。用相同的豆子練習，讓味道成為你的回饋。</p></div>
      <div class="course-parameter-grid">${c.parameters.map((p, i) => `<article class="course-parameter-card">${image('param-' + p.id, p.alt)}<div><p class="section-kicker">0${i + 1} / ${p.en}</p><h4>${e(p.id === 'time' ? '沖煮時間' : p.title)}</h4><p class="course-question">${e(p.question)}</p><p>${e(p.description)}</p><button type="button" data-course-tip aria-expanded="false" aria-controls="tip-${p.id}">課堂怎麼練 <span aria-hidden="true">＋</span></button><p id="tip-${p.id}" class="course-tip" hidden>${e(p.tip)}</p></div></article>`).join('')}</div>
      <article class="course-beans"><div class="course-beans-intro"><div><p class="section-kicker">04 / KNOW YOUR BEANS</p><h3>買豆之前，<br>先看懂你喜歡什麼。</h3><p>精品豆與商業豆各有不同訴求。從資訊、風味與用途出發，選適合自己的咖啡。</p><a class="text-link" href="shop.html">把課堂的選豆方法，帶進咖啡選購 ↗</a></div>${image('beans', '不同烘焙程度的咖啡豆與無標示豆袋；為選豆情境示意')}</div><div class="course-comparison"><table><caption class="sr-only">精品豆與商業豆常見訴求比較</caption><thead><tr><th scope="col">選豆觀察</th><th scope="col">精品豆</th><th scope="col">商業豆</th></tr></thead><tbody>${c.comparison.map(row => `<tr><th scope="row">${e(row[0])}</th><td>${e(row[1])}</td><td>${e(row[2])}</td></tr>`).join('')}</tbody></table></div><p class="course-source">以上為常見訴求，不是絕對分類；深淺焙也不等同精品與商業。<a href="https://sca.coffee/what-is-specialty-coffee" target="_blank" rel="noopener noreferrer">參考 SCA 精品咖啡定義 ↗</a></p></article>
    </section>
    <section id="journey" class="course-wash"><div class="wrapper course-section">${chapter('02', 'YOUR FOUR HOURS', '先喝一口，再學會怎麼沖。', '四小時，循著一杯咖啡的誕生，慢慢把方法練熟。')}<ol class="course-journey">${c.journey.map(([title, description], i) => `<li><span>0${i + 1}</span><h3>${e(title)}</h3><p>${e(description)}</p></li>`).join('')}</ol><p class="course-journey-note">兩位講師親自授課，一人也可以開班。</p></div></section>
    <section id="materials" class="wrapper course-section course-materials"><div>${chapter('03', 'TAKE THE METHOD HOME', '帶回家的，<br>是一套可以繼續練的方法。', '課堂裡的理解，留在回家後的每一杯。')}<div class="course-material-list"><h3>SOP 學習卡</h3><p>讓準備、注水與品飲的重點，有一張清楚的提醒。</p><h3>一本可以寫滿筆記的講義</h3><p>記下參數、杯中風味與老師的提醒，留下自己的學習軌跡。</p></div><p class="course-source">課程包含學習卡與講義，不包含贈送器材。</p></div><div class="course-workbook"><p class="section-kicker">好好手沖 / WORKBOOK</p><h3>我的<br>手沖筆記。</h3><p>每一杯，都有下一步。</p><div><span>今天的咖啡豆</span><span>豆量 / 水量 / 水溫 / 刻度</span><span>我喝到的味道</span><span>下一杯，試著改變</span></div><p class="course-workbook-note">教材示意・實際版面依課程調整</p></div></section>
    <section id="teachers" class="course-wash"><div class="wrapper course-section">${chapter('04', 'LEARN WITH US', '兩位老師，<br>陪你找到自己的手沖節奏。', '我們是阿勳與露露。從第一個問題到第一杯咖啡，一起把方法練清楚。')}<div class="course-teachers"><article>${image('hsun-card', '講師阿勳的真實照片')}<div><p class="section-kicker">YOUR COFFEE GUIDE / 01</p><h3>阿勳</h3><p>陪你釐清沖煮步驟，從操作與風味中找到調整方向。</p></div></article><article>${image('lulu-card', '講師露露的真實照片')}<div><p class="section-kicker">YOUR COFFEE GUIDE / 02</p><h3>露露</h3><p>把新手的疑問一步步拆解，讓練習變成能帶回日常的方法。</p></div></article></div><div class="course-classroom">${image('class-pour', '老師在學員身旁指導手沖的真實上課照片')}${image('class-circle', '學員圍在桌邊看手沖示範的真實上課照片')}<div><p class="section-kicker">REAL PEOPLE. REAL PRACTICE.</p><h3>問題，就留在現場一起解開。</h3><p>一人也可開班<br>阿勳與露露親自授課<br>林口／樹林／土城可安排</p></div></div><p class="course-source">課程情境圖為生成示意；講師及現場使用真實照片。</p></div></section>
    <section id="course-faq" class="wrapper course-section course-faq">${chapter('05', 'A FEW GOOD QUESTIONS', '第一次來，<br>你可能想知道。', '')}<div class="faq-list">${c.faqs.map(([q, a]) => `<details><summary>${e(q)}<span aria-hidden="true">+</span></summary><p>${e(a)}</p></details>`).join('')}</div></section>
    <section id="booking" class="course-booking"><div class="wrapper"><p class="section-kicker">YOUR NEXT CUP STARTS HERE</p><h2>讓下一杯咖啡，<br>有你的風格。</h2><p>不用先懂咖啡，帶著好奇心就好。</p><div class="course-booking-price"><strong>${price}</strong><span>／人 · 四小時</span></div>${inquire('LINE 預約咖啡課程', 'course-booking-button')}<p class="course-booking-details">林口／樹林／土城可安排 · 一人也可開班<br>SOP 學習卡 ＋ 筆記講義 · 兩位講師親自授課</p><p class="course-booking-small">透過 LINE 確認開課時間、詳細地址與準備事項。</p></div></section>
    <div class="course-mobile-booking"><span><strong>${price}</strong><small>／人 · 四小時</small></span>${inquire('LINE 詢問開課')}</div>    <section class="wrapper course-section course-shop-return"><div class="section-heading"><div><p class="section-kicker">CONTINUE YOUR COFFEE RITUAL</p><h2>把課堂的風味，帶回日常。</h2></div><a href="shop.html" class="text-link">探索全部咖啡 ↗</a></div><div class="coffee-grid">${window.CoffeeStore.state().products.filter(p=>p.active).slice(0,3).map(p=>window.CoffeeUI.coffeeCard(p,true)).join('')}</div></section>
`;

  document.querySelectorAll('[data-course-tip]').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
    button.querySelector('span').textContent = expanded ? '＋' : '−';
  }));
  const header = document.querySelector('.course-header');
  const menu = document.getElementById('course-menu-toggle');
  const closeMenu = restoreFocus => {
    header.classList.remove('is-menu-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', window.CoffeeI18n.translate('開啟選單'));
    if (restoreFocus) menu.focus();
  };
  menu.addEventListener('click', () => {
    if (menu.getAttribute('aria-expanded') === 'true') closeMenu(false);
    else {
      header.classList.add('is-menu-open');
      menu.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-label', window.CoffeeI18n.translate('關閉選單'));
    }
  });
  document.querySelectorAll('#course-nav a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(false); });
})();
