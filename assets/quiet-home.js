(() => {
  'use strict';
  const media=document.querySelector('.quiet-hero-media');
  if(!media)return;
  const root=document.documentElement;
  const shots=[...media.querySelectorAll('.quiet-shot')];
  const controls=media.querySelector('.quiet-photo-controls');
  const count=document.getElementById('quiet-count');
  const caption=document.getElementById('quiet-caption');
  const labels=['手沖與熟豆','露露示範手沖'];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,timer=null,inView=true,focused=false,hovered=false;
  const show=index=>{
    const next=(index+shots.length)%shots.length;
    if(!shots[next].complete){shots[next].addEventListener('load',()=>show(next),{once:true});return;}
    if(!shots[next].naturalWidth)return;
    current=next;
    shots.forEach((image,n)=>{image.classList.toggle('is-current',n===current);image.setAttribute('aria-hidden',String(n!==current));});
    count.textContent=`${String(current+1).padStart(2,'0')} / ${String(shots.length).padStart(2,'0')}`;
    caption.textContent=window.CoffeeI18n.translate(labels[current]);
  };
  const sync=()=>{
    clearInterval(timer);timer=null;
    const playing=!reduced.matches&&root.dataset.motion!=='paused'&&!document.hidden&&inView&&!focused&&!hovered;
    media.dataset.playing=String(playing);
    if(playing)timer=setInterval(()=>show(current+1),7500);
  };
  document.getElementById('quiet-prev').addEventListener('click',()=>{show(current-1);sync();});
  document.getElementById('quiet-next').addEventListener('click',()=>{show(current+1);sync();});
  controls.addEventListener('focusin',()=>{focused=true;sync();});
  controls.addEventListener('focusout',event=>{if(!controls.contains(event.relatedTarget)){focused=false;sync();}});
  controls.addEventListener('mouseenter',()=>{hovered=true;sync();});
  controls.addEventListener('mouseleave',()=>{hovered=false;sync();});
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-motion']});
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync();},{threshold:0}).observe(media);
  sync();
})();
