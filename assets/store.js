(() => {
 'use strict';
 const KEY='pure-select-store-v1';
 const copy=x=>JSON.parse(JSON.stringify(x));
 const error=message=>{throw new Error(message)};
 const number=(x,name,min=0,max=1000000)=>{const n=x;if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max)error(`${name}超出允許範圍`);return n};
 const integer=(x,name,min=0,max=1000000)=>{const n=number(x,name,min,max);if(!Number.isInteger(n))error(`${name}必須是整數`);return n};
 const text=(x,name,max=200)=>{if(typeof x!=='string'||!x.trim()||x.length>max)error(`${name}必須填寫，且不能超過 ${max} 字`);return x.trim()};
 const today=()=>{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=t=>parts.find(p=>p.type===t).value;return `${get('year')}-${get('month')}-${get('day')}`};
 const imageURL=x=>typeof x==='string'&&((/^assets\/[a-zA-Z0-9_./-]+$/.test(x)&&!x.includes('..'))||/^https:\/\//.test(x)||/^data:image\/(?:jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(x));
 function validateProduct(p){
  if(typeof p.active!=='boolean')error('上架狀態必須是布林值');if(!p.brew||!p.profile)error('缺少沖煮與風味示意設定');['ratio','temperature','grind'].forEach(k=>text(p.brew[k],'沖煮設定',150));Object.values(p.profile).forEach(v=>integer(v,'風味示意分數',1,5));text(p.id,'商品 ID',60);if(!/^[a-z0-9-]+$/.test(p.id))error('商品 ID 僅可含小寫英文字、數字與連字號');
  ['name','country','region','variety','process','roast','description'].forEach(k=>text(p[k],k,1200));
  if(!['floral','sweet','cocoa'].includes(p.flavor))error('請選擇風味分類');
  if(!Array.isArray(p.flavors)||!p.flavors.length||p.flavors.length>10||p.flavors.some(v=>typeof v!=='string'||v.length>40))error('請填寫 1–10 個風味描述');
  if(!Array.isArray(p.gallery)||p.gallery.length<5||p.gallery.length>12)error('每款商品需要 5–12 張圖片');
  if(new Set(p.gallery.map(i=>i.src)).size<5)error('每款商品至少需要 5 張不同圖片');p.gallery.forEach(i=>{if(!imageURL(i.src))error('圖片需為 assets/ 路徑、HTTPS 網址或 PNG/JPEG/WebP 圖片');text(i.alt,'圖片說明',200);text(i.label,'圖片標題',40)});
  if(!Array.isArray(p.variants)||p.variants.length!==2)error('請保留 250g 與 500g 兩個 SKU');
  p.variants.forEach((v,i)=>{if(v.grams!==[250,500][i]||v.sku!==`${p.id}-${v.grams}`)error('SKU 與克數不一致');integer(v.price,'價格',1,100000);integer(v.stock,'庫存包數',0,100000)});
 }
 const timestamp=v=>{if(typeof v!=='string'||!Number.isFinite(Date.parse(v)))error('紀錄時間格式不正確')};
 function validate(s){
  if(s?.version!==1||!Array.isArray(s.products)||!Array.isArray(s.orders)||!Array.isArray(s.cart)||!Array.isArray(s.batches)||!Array.isArray(s.ledger)||!s.settings)error('資料格式不相容');
  s.products.forEach(validateProduct);
  if(new Set(s.products.map(p=>p.id)).size!==s.products.length)error('商品 ID 重複');
  text(s.settings.shopName,'商店名稱',50);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.settings.supportEmail))error('客服電子信箱格式不正確');integer(s.settings.shippingFee,'運費',0,10000);integer(s.settings.freeShipping,'免運門檻',0,100000);integer(s.settings.carouselSeconds,'輪播秒數',4,30);
  const ids=new Set(s.products.map(p=>p.id));
  const batchIds=new Set();
  s.batches.forEach(b=>{if(typeof b.stockApplied!=='boolean'||b.stockApplied!==(b.status==='completed'))error('批次入庫旗標與狀態不一致');if(batchIds.has(b.id)||!ids.has(b.productId))error('批次商品關聯或 ID 不正確');batchIds.add(b.id);if(!['planned','roasting','completed'].includes(b.status))error('批次狀態不正確');date(b.roastDate);integer(b.durationSeconds,'烘焙秒數',60,3600);integer(b.packs?.['250'],'250g 包數',0,100000);integer(b.packs?.['500'],'500g 包數',0,100000)});
  s.products.forEach(p=>{if(p.batchId&&!s.batches.some(b=>b.id===p.batchId&&b.productId===p.id&&b.status==='completed'))error('商品烘焙批次關聯不正確')});
  if(new Set(s.cart.map(i=>i.sku)).size!==s.cart.length)error('購物車 SKU 重複');s.cart.forEach(i=>{const p=s.products.find(p=>p.id===i.productId);if(!p||!p.variants.some(v=>v.sku===i.sku))error('購物車商品不存在');integer(i.quantity,'購買包數',1,99)});
  const orderIds=new Set();
  s.orders.forEach(o=>{text(o.id,'訂單號碼',100);timestamp(o.createdAt);if(orderIds.has(o.id)||!Array.isArray(o.items)||!o.items.length)error('訂單格式不正確');orderIds.add(o.id);if(!statuses.includes(o.status)||!payments.includes(o.payment))error('訂單狀態不正確');['subtotal','shipping','total'].forEach(k=>integer(o[k],'訂單金額',0,10000000));if(o.total!==o.subtotal+o.shipping)error('訂單總額不一致');let sub=0;o.items.forEach(i=>{integer(i.quantity,'訂單包數',1,99);integer(i.price,'訂單價格',1,100000);integer(i.grams,'訂單重量',1,10000);sub+=i.quantity*i.price;if(!ids.has(i.productId))error('訂單對應商品不存在')});if(new Set(o.items.map(i=>i.sku)).size!==o.items.length)error('訂單 SKU 重複');o.items.forEach(i=>{const p=s.products.find(p=>p.id===i.productId);if(!p.variants.some(v=>v.sku===i.sku&&v.grams===i.grams))error('訂單規格對應不正確')});if(typeof o.reserved!=='boolean'||!Array.isArray(o.history))error('訂單庫存或歷程格式不正確');o.history.forEach(h=>{timestamp(h.at);text(h.text,'處理紀錄',1000)});if(sub!==o.subtotal)error('訂單品項總額不一致');text(o.customer?.name,'訂購人',80);text(o.customer?.email,'電子信箱',150);text(o.customer?.phone,'電話',30);text(o.customer?.address,'地址',300)});
  s.ledger.forEach(m=>{timestamp(m.at);integer(m.delta,'庫存異動包數',-100000,100000);integer(m.balance,'庫存餘額',0,100000);text(m.reason,'庫存異動原因',1000)});
  return s;
 }
 function date(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v)||new Date(v+'T00:00:00Z').toISOString().slice(0,10)!==v)error('日期格式不正確');return v}
 const statuses=['new','confirmed','packing','shipped','completed','cancelled'];
 const payments=['unpaid','paid','refund_pending','refunded'];
 let memory=copy(window.COFFEE_SEED);
 // Retain old products and their order associations; retire only listings that retain their original demo names.
 function migrateCatalog(saved){
  const seed=window.COFFEE_SEED;
  if(saved.serviceRevision!==seed.serviceRevision){
   if(saved.settings.supportEmail==='contact@pureselectcoffee.tw')saved.settings.supportEmail=seed.settings.supportEmail;
   if(saved.settings.freeShipping===1500)saved.settings.freeShipping=seed.settings.freeShipping;
   saved.serviceRevision=seed.serviceRevision;
  }
  if(saved.catalogRevision===seed.catalogRevision)return saved;
  const retired={"kenya-nyeri":"肯亞・涅里 水洗","colombia-huila":"哥倫比亞・薇拉 水洗","guatemala-antigua":"瓜地馬拉・安提瓜 水洗","costa-rica":"哥斯大黎加・塔拉珠 紅蜜","panama-geisha":"巴拿馬・波奎特 藝伎水洗","taiwan-alishan":"台灣・阿里山 山美水洗"};
  // A custom catalog does not receive new sample products.
  if(saved.products.some(p=>p.id==='yirgacheffe')&&saved.products.some(p=>p.id==='guji')){
   saved.products.forEach(p=>{if(retired[p.id]===p.name)p.active=false});
   const fresh=seed.products.find(p=>p.id==='guatemala-huehuetenango');
   if(!saved.products.some(p=>p.id===fresh.id)){
    const product=copy(fresh),batch=copy(seed.batches.find(b=>b.id===fresh.batchId));
    while(saved.batches.some(b=>b.id===batch.id))batch.id+='-NEW';
    product.batchId=batch.id;saved.products.unshift(product);saved.batches.push(batch);
   }
  }
  saved.catalogRevision=seed.catalogRevision;return saved;
 }
 function state(){let raw;try{raw=localStorage.getItem(KEY)}catch(_){return copy(memory)}if(!raw)return copy(memory);try{const saved=validate(JSON.parse(raw));if(['四選淨豆','一遇'].includes(saved.settings?.shopName))saved.settings.shopName=window.COFFEE_SEED.settings.shopName;return copy(validate(migrateCatalog(saved)))}catch(_){error('已保存的展示資料格式不相容，請先匯出或從設定還原示範資料')}}
 function commit(s){validate(s);s.updatedAt=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(s))}catch(_){error('資料無法保存：請檢查瀏覽器儲存權限或空間。此次修改未套用。')}memory=copy(s);window.dispatchEvent(new CustomEvent('coffee:change'));return copy(s)}
 const mutate=fn=>{const s=state();const result=fn(s);commit(s);return copy(result??s)};
 const getProduct=(s,id)=>s.products.find(p=>p.id===id)||error('找不到商品');
 const getVariant=(p,sku)=>p.variants.find(v=>v.sku===sku)||error('找不到規格');
 const ledger=(s,p,v,delta,reason)=>s.ledger.unshift({id:'MV-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),at:new Date().toISOString(),productId:p.id,sku:v.sku,grams:v.grams,delta,balance:v.stock,reason});
 function cartDetails(s=state()){const lines=s.cart.map(i=>{const product=getProduct(s,i.productId),variant=getVariant(product,i.sku);return {...i,product,variant,lineTotal:variant.price*i.quantity}});const subtotal=lines.reduce((n,i)=>n+i.lineTotal,0),shipping=lines.length&&subtotal<s.settings.freeShipping?s.settings.shippingFee:0;return {lines,subtotal,shipping,total:subtotal+shipping,count:lines.reduce((n,i)=>n+i.quantity,0),grams:lines.reduce((n,i)=>n+i.quantity*i.variant.grams,0)}}
 function addCart(id,sku,q){return mutate(s=>{q=integer(q,'購買包數',1,99);const p=getProduct(s,id),v=getVariant(p,sku);if(!p.active)error('此商品已下架');const i=s.cart.find(i=>i.sku===sku);const total=(i?.quantity||0)+q;if(total>v.stock||total>99)error('購買包數超過目前庫存');if(i)i.quantity=total;else s.cart.push({productId:id,sku,quantity:q})})}
 function setCart(sku,q){return mutate(s=>{q=integer(q,'購買包數',0,99);const i=s.cart.find(i=>i.sku===sku);if(!i)error('購物車品項不存在');if(q===0){s.cart=s.cart.filter(i=>i.sku!==sku);return}const v=getVariant(getProduct(s,i.productId),sku);if(q>v.stock)error('購買包數超過目前庫存');i.quantity=q})}
 function createOrder(customer){return mutate(s=>{['name','email','phone','address'].forEach(k=>text(customer[k],k,k==='address'?300:150));if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))error('電子信箱格式不正確');const c=cartDetails(s);if(!c.lines.length)error('購物車是空的');c.lines.forEach(i=>{if(!i.product.active||i.quantity>i.variant.stock)error(`${i.product.name} 庫存不足或已下架`)});let id='DEMO-'+today().replaceAll('-','')+'-'+String(s.orders.length+1).padStart(4,'0');while(s.orders.some(o=>o.id===id))id+='X';const o={id,createdAt:new Date().toISOString(),status:'new',payment:'unpaid',customer:copy(customer),items:c.lines.map(i=>({productId:i.productId,sku:i.sku,name:i.product.name,grams:i.variant.grams,price:i.variant.price,quantity:i.quantity,batchId:i.product.batchId||''})),subtotal:c.subtotal,shipping:c.shipping,total:c.total,reserved:true,tracking:'',notes:'示範訂單，沒有付款或物流服務。',history:[{at:new Date().toISOString(),text:'建立示範訂單並保留庫存'}]};c.lines.forEach(i=>{i.variant.stock-=i.quantity;ledger(s,i.product,i.variant,-i.quantity,'訂單 '+id)});s.orders.unshift(o);s.cart=[];return o})}
 function updateOrder(id,changes){return mutate(s=>{const o=s.orders.find(o=>o.id===id)||error('訂單不存在');if(changes.status&&changes.status!==o.status){const next=changes.status;if(!statuses.includes(next))error('訂單狀態不正確');if(o.status==='cancelled')error('已取消訂單無法重新出貨');if(next==='cancelled'){if(['shipped','completed'].includes(o.status))error('已出貨訂單需另行處理退貨，不能直接取消');if(o.reserved){o.items.forEach(i=>{const p=getProduct(s,i.productId),v=getVariant(p,i.sku);v.stock+=i.quantity;ledger(s,p,v,i.quantity,'取消訂單 '+id)});o.reserved=false}if(o.payment==='paid')o.payment='refund_pending'}else{const transitions={new:['confirmed'],confirmed:['packing'],packing:['shipped'],shipped:['completed']};if(!transitions[o.status]?.includes(next))error('請依確認、備貨、出貨、完成的順序處理');if(next==='shipped'&&!String(changes.tracking||o.tracking).trim())error('出貨前請填寫物流單號')}o.status=next;o.history.push({at:new Date().toISOString(),text:'狀態更新為 '+next})}
 if(changes.payment&&changes.payment!==o.payment){if(!payments.includes(changes.payment))error('付款狀態不正確');if(changes.payment==='paid'&&o.status==='cancelled')error('已取消訂單不能標記收款');if(changes.payment==='refunded'&&!(o.status==='cancelled'&&o.payment==='refund_pending'))error('僅待退款的取消訂單可標記退款完成');if(changes.payment==='refund_pending')error('待退款狀態由取消已付款訂單產生');if(changes.payment==='unpaid'&&o.payment!=='unpaid')error('已收款或退款狀態不能改回未付款');o.payment=changes.payment;o.history.push({at:new Date().toISOString(),text:'付款記錄更新為 '+changes.payment})}
 if(changes.tracking!==undefined)o.tracking=String(changes.tracking).slice(0,100);if(changes.notes!==undefined)o.notes=String(changes.notes).slice(0,1000);return o})}
 function saveProduct(p){validateProduct(p);return mutate(s=>{const at=s.products.findIndex(v=>v.id===p.id);if(at<0)s.products.push(copy(p));else{const old=s.products[at];p.variants.forEach(v=>{const was=old.variants.find(x=>x.sku===v.sku);if(v.stock!==was.stock)error('請從庫存管理調整包數，商品編輯不能直接覆寫庫存')});s.products[at]=copy(p)}return p})}
 function deleteProduct(id){return mutate(s=>{if(s.orders.some(o=>o.items.some(i=>i.productId===id)))error('商品有訂單紀錄，請改為下架以保留紀錄');s.products=s.products.filter(p=>p.id!==id);s.batches=s.batches.filter(b=>b.productId!==id);s.cart=s.cart.filter(i=>i.productId!==id);s.ledger=s.ledger.filter(i=>i.productId!==id)})}
 function adjustStock(id,sku,delta,reason){return mutate(s=>{delta=integer(delta,'調整包數',-100000,100000);text(reason,'調整原因',200);const p=getProduct(s,id),v=getVariant(p,sku);if(v.stock+delta<0)error('調整後庫存不能為負數');v.stock+=delta;ledger(s,p,v,delta,reason);return v})}
 function addBatch(b){return mutate(s=>{const p=getProduct(s,b.productId);date(b.roastDate);integer(b.durationSeconds,'烘焙秒數',60,3600);integer(b.packs['250'],'250g 包數',0,100000);integer(b.packs['500'],'500g 包數',0,100000);if(!b.packs['250']&&!b.packs['500'])error('請填寫至少一包的包裝量');const batch={...copy(b),id:'RB-'+Date.now()+'-'+Math.random().toString(36).slice(2,5),roast:p.roast,status:'planned',stockApplied:false};s.batches.unshift(batch);return batch})}
 function updateBatch(id,status){return mutate(s=>{const b=s.batches.find(b=>b.id===id)||error('批次不存在');if(b.status==='completed')error('已完成批次不能重複入庫');if(status==='completed'&&b.status!=='roasting')error('請先將批次標記為烘焙中');if(!['roasting','completed'].includes(status))error('批次狀態不正確');if(status==='completed'){if(b.roastDate>today())error('未到烘焙日期，不能標记完成');if(b.stockApplied)error('此批次已入庫');const p=getProduct(s,b.productId);p.variants.forEach(v=>{const q=b.packs[String(v.grams)];v.stock+=q;ledger(s,p,v,q,'批次完成 '+id)});b.stockApplied=true;const current=s.batches.find(x=>x.id===p.batchId);if(!current||b.roastDate>=current.roastDate)p.batchId=b.id}b.status=status;return b})}
 function saveSettings(settings){return mutate(s=>{s.settings={...s.settings,...settings};return s.settings})}
 function exportData(){return JSON.stringify(state(),null,2)}
 function importData(raw){const s=validate(JSON.parse(raw));commit(migrateCatalog(s))}
 function reset(){return commit(copy(window.COFFEE_SEED))}
 window.addEventListener('storage',event=>{if(event.key===KEY)window.dispatchEvent(new CustomEvent('coffee:change'))});
 window.CoffeeStore={state,cartDetails,addCart,setCart,createOrder,updateOrder,saveProduct,deleteProduct,adjustStock,addBatch,updateBatch,saveSettings,exportData,importData,reset,today,validate,imageURL,statuses,payments};
})();
