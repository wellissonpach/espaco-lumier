import urllib.request
import re
import json

urls = [
  ('Review 1', 'https://maps.app.goo.gl/ifztngM8dpNusn6e9'),
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

def process_url(label, u):
    print(f"\n--- Fetching {label}: {u} ---")
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
        rpc_links = re.findall(r'href="([^"]+_rpc[^"]+)"', html)
        if not rpc_links:
            print(f"No RPC link found for {label}")
            return None
            
        rpc_url = "https://www.google.com" + rpc_links[0].replace('&amp;', '&')
        req_rpc = urllib.request.Request(rpc_url, headers=headers)
        with urllib.request.urlopen(req_rpc, timeout=12) as resp_rpc:
            rpc_text = resp_rpc.read().decode('utf-8', errors='ignore')
            
        if ")]}'" in rpc_text:
            rpc_text = rpc_text[rpc_text.index('['):]
        data = json.loads(rpc_text)
        
        author = None
        avatar = None
        try:
            author = data[2][0]
        except Exception:
            pass
            
        try:
            avatar = data[2][1][6][0]
        except Exception:
            pass

        quote = None
        date_str = None
        rating = 5

        def search_fields(obj):
            nonlocal quote, date_str, rating
            if isinstance(obj, list):
                for item in obj:
                    search_fields(item)
            elif isinstance(obj, dict):
                for v in obj.values():
                    search_fields(v)
            elif isinstance(obj, str):
                if len(obj) > 30 and not obj.startswith('http') and not obj.startswith('//') and not obj.startswith('0ahUKE'):
                    if quote is None or len(obj) > len(quote):
                        quote = obj
                if any(x in obj.lower() for x in ['atrás', 'ano', 'mês', 'meses', 'semana', 'dias', 'ago']):
                    if date_str is None and len(obj) < 40:
                        date_str = obj
                        
        search_fields(data)

        def find_rating(obj):
            if isinstance(obj, list):
                if len(obj) == 1 and isinstance(obj[0], int) and 1 <= obj[0] <= 5:
                    return obj[0]
                for x in obj:
                    r = find_rating(x)
                    if r is not None:
                        return r
            return None

        try:
            rating = find_rating(data[5]) or 5
        except Exception:
            rating = 5

        res = {
            'label': label,
            'url': u,
            'author': author,
            'avatar': avatar,
            'rating': rating,
            'date': date_str,
            'quote': quote
        }
        print(f"Author: {author}")
        print(f"Rating: {rating} stars")
        print(f"Date: {date_str}")
        print(f"Quote: {quote}")
        print(f"Avatar: {avatar}")
        return res
    except Exception as e:
        print(f"Error on {label}: {e}")
        return None

results = []
for label, u in urls:
    r = process_url(label, u)
    if r:
        results.append(r)

with open('scratch/all_extracted_reviews.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, indent=2, ensure_ascii=False)
print("\nDone! Saved to scratch/all_extracted_reviews.json")
