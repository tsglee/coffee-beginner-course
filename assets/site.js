(()=>{
'use strict';
const en=document.body.dataset.lang==='en';
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
function setMenu(open){header.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',en?(open?'Close menu':'Open menu'):(open?'關閉選單':'開啟選單'));}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
document.querySelector('#main-nav').addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus()}});
window.matchMedia('(min-width:1041px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
const parameters={
 temperature:{zh:['水溫：先記下，才知道怎麼比。','水溫會影響萃取速度，但不是越熱越好。用同一支豆子、固定其他條件，喝喝看溫度改變時，香氣與味道有什麼不同。','課堂練習：先秤準豆與水，記下溫度，品飲後再決定下一杯。'],en:['Temperature: write it down, then compare.','Water temperature affects extraction, but hotter is not always better. Use the same coffee and keep other choices steady to explore how temperature changes aroma and flavor.','In class: weigh coffee and water, record the temperature, then taste before planning the next cup.']},
 grind:{zh:['研磨：不只記刻度，也看水怎麼流。','磨得更細，接觸面積與水流表現都會改變，卻不代表一定更好喝。認識自己的磨豆機，搭配流速與品飲，才知道要往哪邊調。','課堂練習：固定豆與水，比較研磨改變後的流速與口感。'],en:['Grind: watch the flow, not just the number.','A finer grind changes surface area and water flow, but does not automatically make better coffee. Get to know your grinder, observe the flow and taste before you adjust.','In class: keep coffee and water steady, then compare flow and texture as the grind changes.']},
 dose:{zh:['豆量與水量：先把比例抓清楚。','濃一點、淡一點，先從豆與水的比例認識。秤準每次用量，把計畫寫下來，才有辦法比較兩杯咖啡的差別。','課堂練習：記錄豆量、總水量與品飲感受，做一張自己的沖煮計畫。'],en:['Coffee and water: know your ratio.','To explore a stronger or lighter cup, start with the relationship between coffee and water. Weigh both and write down your plan so two cups can be compared meaningfully.','In class: record coffee dose, total water and tasting notes to make your own brew plan.']},
 time:{zh:['時間：是一個線索，不是唯一的答案。','沖煮時間會受到研磨、注水與流速影響。不是越久越完整，也不是越快越好；把時間和杯中的味道一起看，才有下一步。','課堂練習：記下總時間，再回顧這杯的味道與注水過程。'],en:['Time: a clue, rather than the whole answer.','Grind, pouring and flow all affect brew time. Longer does not always mean better, and faster is not always the goal. Consider the time alongside what you taste.','In class: record total brew time, then review the taste and how you poured.']}
};
const output=document.getElementById('parameter-content');
if(output){document.querySelectorAll('[data-param]').forEach(button=>{button.addEventListener('click',()=>{
 const key=button.dataset.param;
 const values=parameters[key][en?'en':'zh'];
 document.querySelectorAll('[data-param]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.getElementById('parameter-title').textContent=values[0];
 document.getElementById('parameter-body').textContent=values[1];
 document.getElementById('parameter-tip').textContent=values[2];
 const symbol=output.querySelector('.parameter-symbol');symbol.replaceChildren(button.querySelector('svg').cloneNode(true));
 output.classList.remove('is-changing');requestAnimationFrame(()=>output.classList.add('is-changing'));
})})}
})();
