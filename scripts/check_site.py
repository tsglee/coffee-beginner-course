"""Check static local references and the public LINE funnel."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class Check(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.anchors = []
        self.inquiries = 0

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        names = [name for name, _ in attrs]
        assert len(names) == len(set(names)), (self.path, 'duplicate attribute', tag)
        if values.get('id'):
            assert values['id'] not in self.ids, (self.path, 'duplicate id', values['id'])
            self.ids.add(values['id'])
        if values.get('data-line-inquiry'):
            assert values.get('href') == 'https://lin.ee/5bkhZu1', (self.path, 'wrong LINE destination')
            assert values.get('target') == '_blank' and 'noopener' in values.get('rel', ''), (self.path, 'external link safety')
            self.inquiries += 1
        for attr in ['src', 'href']:
            value = values.get(attr, '')
            url = urlsplit(value)
            if url.scheme or url.netloc or not value:
                continue
            if url.path:
                target = self.path.parent / unquote(url.path)
                assert target.exists(), (self.path, 'missing local reference', value)
            elif url.fragment:
                self.anchors.append(url.fragment)

for path in sorted(ROOT.glob('*.html')):
    parser = Check(path)
    parser.feed(path.read_text())
    if path.name != 'admin-orders.html':
        assert 'assets/readability.css?v=20261101-design1' in path.read_text() or path.name in ['designs.html', 'design-signature.html'], path
    # Some course/store anchors are supplied by the documented client renderer.
    if path.name.startswith('design-') or path.name == 'index.html':
        assert parser.inquiries >= 4, (path, 'missing course/bean actions')
        assert all(anchor in parser.ids for anchor in parser.anchors), (path, 'broken static anchor')
print('PASS all root HTML assets, local pages, static anchors and LINE destinations.')
