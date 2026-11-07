"""Validate the editable coffee catalog before writing any generated pages."""
import json
import re
from datetime import date


def load_catalog(path, root, photo_sources):
    data = json.loads(path.read_text())
    products = data.get('products', [])
    if not isinstance(products, list) or not 3 <= len(products) <= 5:
        raise ValueError('本期豆單必須有 3–5 款商品；請檢查 products。')
    date.fromisoformat(data['updated'])
    for key, lower, upper in [('refresh_months', 1, 12), ('student_discount_percent', 0, 99)]:
        if type(data.get(key)) is not int or not lower <= data[key] <= upper:
            raise ValueError(f'{key} 必須是 {lower}–{upper} 的整數。')
    seen = set()
    for bean in products:
        ident = bean.get('id', '')
        if not re.fullmatch(r'[a-z][a-z0-9-]*', ident) or ident in seen:
            raise ValueError(f'商品 id 必須是唯一的英文小寫代號：{ident}')
        seen.add(ident)
        for key in ['zh', 'origin_zh', 'process_zh', 'title_zh', 'body_zh', 'roast_zh']:
            if not isinstance(bean.get(key), str) or not bean[key].strip():
                raise ValueError(f'{ident} 缺少 {key}。')
        for key in ['weight_g', 'price_ntd']:
            if type(bean.get(key)) is not int or bean[key] <= 0:
                raise ValueError(f'{ident} 的 {key} 必須是正整數。')
        if not isinstance(bean.get('notes_zh'), list) or len(bean['notes_zh']) < 2 or not all(isinstance(n, str) and n.strip() for n in bean['notes_zh']):
            raise ValueError(f'{ident} 至少需要兩個風味描述。')
        if bean.get('color') not in ['rose', 'blue', 'green']:
            raise ValueError(f'{ident} 的 color 請選 rose、blue 或 green。')
        photos = bean.get('photos', {})
        for key in ['beans', 'origin', 'flavor']:
            source = photo_sources.get(photos.get(key))
            if not source or not (root / source['asset']).is_file():
                raise ValueError(f'{ident} 的 {key} 照片或來源紀錄不存在。')
        for key in ['location_zh', 'flavor_zh', 'bean_caption_zh', 'context_zh']:
            if not isinstance(photos.get(key), str) or not photos[key].strip():
                raise ValueError(f'{ident} 缺少照片說明 {key}。')
        # English is optional while only the Chinese catalog is being maintained.
        for key in list(bean):
            if key.endswith('_zh'):
                bean.setdefault(key[:-3] + '_en', bean[key])
        bean.setdefault('en', bean['zh'])
        for key in list(photos):
            if key.endswith('_zh'):
                photos.setdefault(key[:-3] + '_en', photos[key])
    return data
