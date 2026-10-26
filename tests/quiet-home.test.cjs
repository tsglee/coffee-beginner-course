const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function harness({reduce=false}={}) {
 const events=()=>({listeners:{},addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)},fire(type,event={}){for(const fn of this.listeners[type]||[])fn(event)}});
 const shot=active=>({...events(),complete:true,naturalWidth:1536,attributes:{},active,classList:{toggle(name,value){this.owner.active=value}},setAttribute(key,value){this.attributes[key]=value}});
 const shots=[shot(true),shot(false)];shots.forEach(s=>s.classList.owner=s);
 const controls={...events(),contains(node){return node===this}};
 const media={dataset:{},querySelectorAll(){return shots},querySelector(){return controls}};
 const root={dataset:{}};
 const nodes={'quiet-count':{textContent:'01 / 02'},'quiet-caption':{textContent:'手沖與熟豆'},'quiet-prev':events(),'quiet-next':events()};
 const document={...events(),documentElement:root,hidden:false,querySelector(){return media},getElementById(id){return nodes[id]}};
 const reduced={...events(),matches:reduce},timers=new Map(),mutations=[],intersections=[];let next=0;
 const context=vm.createContext({document,window:{CoffeeI18n:{translate:s=>'EN:'+s}},matchMedia:()=>reduced,setInterval:fn=>{timers.set(++next,fn);return next},clearInterval:id=>timers.delete(id),MutationObserver:class{constructor(fn){mutations.push(fn)}observe(){}},IntersectionObserver:class{constructor(fn){intersections.push(fn)}observe(){}},String});
 context.window.IntersectionObserver=context.IntersectionObserver;
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/quiet-home.js'),'utf8'),context);
 return {shots,controls,media,root,nodes,document,reduced,timers,mutations,intersections,tick(){for(const fn of [...timers.values()])fn()}};
}
function test(label,fn){fn();console.log('PASS',label)}
test('hero cycles manually in both directions and exposes only the current photograph to assistive technology',()=>{
 const h=harness();h.nodes['quiet-next'].fire('click');assert.equal(h.nodes['quiet-count'].textContent,'02 / 02');assert.equal(h.nodes['quiet-caption'].textContent,'EN:露露示範手沖');assert.equal(h.shots[0].attributes['aria-hidden'],'true');assert.equal(h.shots[1].attributes['aria-hidden'],'false');
 h.nodes['quiet-next'].fire('click');assert.equal(h.nodes['quiet-count'].textContent,'01 / 02');h.nodes['quiet-prev'].fire('click');assert.equal(h.nodes['quiet-count'].textContent,'02 / 02');
});
test('hero autoplay pauses for focus, hover, hidden tabs, offscreen content and the saved motion control',()=>{
 const h=harness();assert.equal(h.timers.size,1);h.tick();assert.equal(h.nodes['quiet-count'].textContent,'02 / 02');
 h.controls.fire('focusin');assert.equal(h.timers.size,0);h.controls.fire('focusout',{relatedTarget:null});assert.equal(h.timers.size,1);
 h.controls.fire('mouseenter');assert.equal(h.timers.size,0);h.controls.fire('mouseleave');assert.equal(h.timers.size,1);
 h.document.hidden=true;h.document.fire('visibilitychange');assert.equal(h.timers.size,0);h.document.hidden=false;h.document.fire('visibilitychange');assert.equal(h.timers.size,1);
 h.intersections[0]([{isIntersecting:false}]);assert.equal(h.timers.size,0);h.intersections[0]([{isIntersecting:true}]);assert.equal(h.timers.size,1);
 h.root.dataset.motion='paused';h.mutations[0]();assert.equal(h.timers.size,0);assert.equal(h.media.dataset.playing,'false');
 h.root.dataset.motion='running';h.mutations[0]();assert.equal(h.timers.size,1);
});
test('reduced motion disables autoplay while manual controls and unloaded-image fallback remain usable',()=>{
 const h=harness({reduce:true});assert.equal(h.timers.size,0);h.shots[1].complete=false;h.shots[1].naturalWidth=0;h.nodes['quiet-next'].fire('click');assert.equal(h.nodes['quiet-count'].textContent,'01 / 02');
 h.shots[1].complete=true;h.shots[1].naturalWidth=1600;h.shots[1].fire('load');assert.equal(h.nodes['quiet-count'].textContent,'02 / 02');assert.equal(h.timers.size,0);
 h.reduced.matches=false;h.reduced.fire('change');assert.equal(h.timers.size,1);h.reduced.matches=true;h.reduced.fire('change');assert.equal(h.timers.size,0);
});
