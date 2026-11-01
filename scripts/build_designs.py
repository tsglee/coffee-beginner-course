# -*- coding: utf-8 -*-
"""Build five presentation variants from the current homepage, without a bundler."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DESIGNS = [
    ('sky', 'A', '霧藍留白', 'Sky & Light', '#dff1fd', '淺藍、白色與深藍。全幅手沖攝影，主張靠左，留白清爽。', 'sky.jpg'),
    ('sage', 'B', '奶油咖啡誌', 'The Slow Journal', '#e0e7d3', '奶油白與植物綠。照片在左、文案在右，像一本慢慢讀的咖啡誌。', 'sage.jpg'),
    ('clay', 'C', '陶土日光', 'Terracotta Studio', '#f2d7c0', '陶土橘與燕麥色。拱形攝影、圓角按鈕，溫暖而有手作感。', 'clay.jpg'),
    ('noir', 'D', '靜夜精品', 'Midnight Reserve', '#11292b', '深青綠、象牙與黃銅色。電影感攝影，寬鬆的精品編輯排版。', 'noir.jpg'),
    ('cobalt', 'E', '鈷藍海報', 'Cobalt Club', '#233ecc', '鈷藍與杏桃。超大標題、橫幅攝影和醒目色塊，節奏更大膽。', 'cobalt.jpg'),
]
source = (ROOT / 'index.html').read_text()
for slug, letter, title, english, color, description, photo in DESIGNS:
    html = source.replace('class="home-dual home-course-first quiet-home"', f'class="home-dual home-course-first quiet-home design-page" data-design="{slug}"')
    html = re.sub(r'<title>.*?</title>', f'<title>{title}｜露露咖啡日記</title>', html, count=1)
    html = html.replace('src="assets/ruru/quiet-brewing.png"', f'src="assets/designs/{photo}"')
    html = html.replace('class="quiet-shot is-current"', 'class="quiet-shot is-current"')
    headlines = {
        'sky': '<span>一起學手沖，</span><span>把喜歡的豆帶回家。</span>',
        'sage': '<span>從一杯咖啡，</span><span>開始慢慢練習。</span>',
        'clay': '<span>咖啡的日常，</span><span>沖成喜歡的模樣。</span>',
        'noir': '<span>一杯好咖啡，</span><span>從你的手裡開始。</span>',
        'cobalt': '<span>好好手沖。</span><span>好好過日子。</span>',
    }
    html = re.sub(r'(<h1 id="hero-title">).*?(</h1>)', lambda m: m[1] + headlines[slug] + m[2], html, count=1)
    # This is an explicit photography-led opening; keep real teachers in their chapter.
    html = re.sub(r'<img class="quiet-shot quiet-shot-lulu"[^>]*>', '', html)
    html = html.replace('<script src="assets/quiet-home.js?v=20261101-design1" defer></script>', '')
    html = html.replace('01 / 02', '01 / 01')
    html = re.sub(r'<div><button type="button" id="quiet-prev".*?</div>', '<div><span>RURU COFFEE JOURNAL</span></div>', html, count=1)
    html = html.replace('<div class="nav-actions">', '<div class="nav-actions"><a class="design-back" href="designs.html">五款設計比較 ↗</a>', 1)
    html = html.replace('露露咖啡日記｜手沖教學・熟豆選購', 'RURU COFFEE JOURNAL / BREW & BEANS')
    html = html.replace('<span id="quiet-caption">手沖與熟豆</span>', '<span id="quiet-caption">好好手沖 / Good Good Pour</span>')
    (ROOT / f'design-{slug}.html').write_text(html)

cards = ''.join(f'''<article class="design-card" style="--swatch:{color}"><a class="design-card-image" href="design-{slug}.html"><img src="assets/designs/{slug}-preview.jpg" alt="{title}的咖啡攝影主視覺"><span>{letter}</span></a><div class="design-card-copy"><p>{english}</p><h2><a href="design-{slug}.html">{title}</a></h2><p>{description}</p><a class="design-open" href="design-{slug}.html">打開完整網站 <span>↗</span></a></div></article>''' for slug,letter,title,english,color,description,photo in DESIGNS)
board = f'''<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>五款設計比較｜露露咖啡日記</title><link rel="icon" href="assets/ruru/official-logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/design-board.css?v=20261101-design1"></head><body><a class="skip-link" href="#designs">跳到五款設計</a><header><a class="brand" href="index.html"><img src="assets/ruru/official-logo.png" alt="露露咖啡日記 Logo" width="64" height="64"><span>露露咖啡日記<small>Ruru Coffee Journal</small></span></a><a href="index.html">目前正式首頁 ↗</a></header><main><p class="eyebrow">RURU / FIVE DESIGN DIRECTIONS</p><h1>同一份咖啡日常，<br>五種不同的表情。</h1><p class="lead">放大文字，也放大風格。<br>五個完整版本，買豆與上課都連到 LINE OA。</p><div class="board-facts"><span>正文 18–19px</span><span>課程 × 精品熟豆</span><span>手機也好讀</span></div><section class="design-grid" id="designs">{cards}</section><footer><p>每一版保留真實講師、完整商品介紹與雙語切換。</p><a href="https://lin.ee/5bkhZu1" target="_blank" rel="noopener noreferrer">LINE 買豆與課程諮詢 ↗</a></footer></main></body></html>'''
(ROOT / 'designs.html').write_text(board)
print('Built five complete design variations and designs.html.')
