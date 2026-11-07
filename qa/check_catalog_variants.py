"""Exercise actual generated catalog output at three, four and five entries."""
from pathlib import Path
import copy, json, subprocess, sys, tempfile, hashlib
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class CatalogPage(HTMLParser):
 def __init__(self):super().__init__();self.products=[];self.anchors=[];self.text=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='article' and 'bean-product' in a.get('class','').split():self.products.append(a['id'])
  if tag=='a' and a.get('href','').startswith('#'):self.anchors.append(a['href'][1:])
 def handle_data(self,text):self.text.append(text)
source=json.loads((ROOT/'data/coffees.json').read_text())
protected=[p for p in [ROOT/'index.html',ROOT/'beans.html',ROOT/'en/index.html',ROOT/'en/beans.html'] if p.is_file()]
before={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in protected}
with tempfile.TemporaryDirectory(prefix='ruru-catalog-check-') as folder:
 tmp=Path(folder)
 for count in [3,4,5]:
  data=copy.deepcopy(source)
  while len(data['products'])<count:
   item=copy.deepcopy(data['products'][0]);i=len(data['products'])+1;item.update(id=f'qa-only-{i}',zh=f'僅驗證用豆款{i}',price_ntd=600+i*10,weight_g=250)
   data['products'].append(item)
  # Editing the Chinese catalog must not require writing translations.
  for bean in data['products']:
   for key in list(bean):
    if key=='en' or key.endswith('_en'):del bean[key]
   for key in list(bean['photos']):
    if key.endswith('_en'):del bean['photos'][key]
  catalog=tmp/'coffees.json';catalog.write_text(json.dumps(data,ensure_ascii=False))
  output=tmp/f'count-{count}'
  subprocess.run([sys.executable,str(ROOT/'build.py'),'--catalog',str(catalog),'--output',str(output)],cwd=ROOT,check=True,capture_output=True)
  html=(output/'beans.html').read_text();page=CatalogPage();page.feed(html);text=' '.join(page.text)
  expected=[b['id'] for b in data['products']]
  assert page.products==expected and all(i in page.anchors for i in expected)
  assert not (output/'en').exists(),'Chinese build wrote English pages'
  assert '從一個喜歡的味道開始' not in text and '三款豆' not in text
  for b in data['products']:
   assert f"NT${b['price_ntd']:,}" in text
   student=(b['price_ntd']*90+50)//100;assert f'NT${student:,}' in text
  print(f'PASS {count} entries: generated navigation/order/prices/student discounts, Chinese-only data and output')
 for label,mutate in [('too few',lambda d:d.update(products=d['products'][:2])),('too many',lambda d:d.update(products=d['products']*2)),('duplicate id',lambda d:d['products'][1].update(id=d['products'][0]['id'])),('missing image',lambda d:d['products'][0]['photos'].update(origin='missing-photo')),('invalid price',lambda d:d['products'][0].update(price_ntd=-1))]:
  data=copy.deepcopy(source);mutate(data);catalog=tmp/'bad.json';catalog.write_text(json.dumps(data))
  output=tmp/'rejected'
  result=subprocess.run([sys.executable,str(ROOT/'build.py'),'--catalog',str(catalog),'--output',str(output)],cwd=ROOT,capture_output=True)
  assert result.returncode!=0 and not output.exists(),label
  print('PASS rejected before output:',label)
assert before=={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in protected},'QA altered real site files'
print('PASS source pages unchanged by variant checks')
