from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import json
ROOT=Path(__file__).parent
catalog=json.loads((ROOT/'data/coffees.json').read_text())
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set();self.images=[];self.h1=0;self.products=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag in ['a','link'] and a.get('href'):self.links.append(a['href'])
  if tag in ['img','script'] and a.get('src'):self.links.append(a['src'])
  if tag=='img':self.images.append(a)
  if tag=='article' and 'bean-product' in a.get('class','').split():self.products+=1
pages={}
files=[ROOT/'index.html',ROOT/'beans.html']
files += [file for file in [ROOT/'en/index.html',ROOT/'en/beans.html'] if file.is_file()]
for file in files:
 p=Page();p.feed(file.read_text());pages[file]=p
 assert p.h1==1,(file,'main heading count')
 assert all(i.get('alt') for i in p.images),(file,'missing alt')
 if file==ROOT/'beans.html':
  assert p.products==len(catalog['products']),(file,'catalog count')
  for bean in catalog['products']:
   assert bean['id'] in p.ids,(file,bean['id'],'catalog anchor')
   assert f"NT${bean['price_ntd']:,}" in file.read_text(),(file,'catalog price')
for file,p in pages.items():
 for raw in p.links:
  u=urlparse(raw)
  if u.scheme or u.netloc:
   if u.netloc=='lin.ee':assert raw=='https://lin.ee/5bkhZu1'
   continue
  target=(file.parent/unquote(u.path)).resolve() if u.path else file
  assert target.is_file(),(file,raw,'missing local asset/page')
  if u.fragment:
   assert target in pages and u.fragment in pages[target].ids,(file,raw,'missing anchor')
print(f"PASS {len(pages)} pages: local paths, images/alt, anchors, LINE and {len(catalog['products'])} current products/prices.")
