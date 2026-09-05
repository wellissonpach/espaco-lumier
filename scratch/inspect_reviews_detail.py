import json

# Let's inspect the exact structure of data[5] in the RPC for each review
import urllib.request
import re

urls = [
  ('Review 2', 'https://maps.app.goo.gl/jCwgFWAJZDxCBzf47'),
  ('Review 3', 'https://maps.app.goo.gl/P3HvsUbWEkyb6Ag86'),
  ('Review 4', 'https://maps.app.goo.gl/qDE6Wo3AaG5QyHe38'),
  ('Review 5', 'https://maps.app.goo.gl/usN8zvLRU48uMcwJ9'),
  ('Review 6', 'https://maps.app.goo.gl/phZfCc5SXpbGJWVYA')
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'pt-BR,pt;q=0.9',
    'Referer': 'https://www.google.com/maps'
}

for label, u in urls:
    req = urllib.request.Request(u, headers=headers)
    with urllib.request.urlopen(req, timeout=12) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    rpc_links = re.findall(r'href="([^"]+_rpc[^"]+)"', html)
    rpc_url = "https://www.google.com" + rpc_links[0].replace('&amp;', '&')
    req_rpc = urllib.request.Request(rpc_url, headers=headers)
    with urllib.request.urlopen(req_rpc, timeout=12) as resp_rpc:
        rpc_text = resp_rpc.read().decode('utf-8', errors='ignore')
    if ")]}'" in rpc_text:
        rpc_text = rpc_text[rpc_text.index('['):]
    data = json.loads(rpc_text)
    
    author = data[2][0]
    print(f"\n=================== {label}: {author} ===================")
    # Check data[5]
    d5 = data[5] if len(data) > 5 else None
    with open(f"scratch/{label.replace(' ', '_')}.json", "w", encoding="utf-8") as f:
        json.dump(d5, f, indent=2, ensure_ascii=False)
    
    # Collect all strings in d5
    def get_strings(obj):
        if isinstance(obj, str):
            yield obj
        elif isinstance(obj, list):
            for x in obj:
                yield from get_strings(x)
        elif isinstance(obj, dict):
            for x in obj.values():
                yield from get_strings(x)
                
    strings = [s for s in get_strings(d5) if len(s) > 3 and not s.startswith('/maps/vt') and not s.startswith('http') and not s.startswith('0ahUKE')]
    print("Strings in d5:", strings)
