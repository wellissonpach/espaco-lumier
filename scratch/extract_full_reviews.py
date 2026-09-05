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

all_data = []

def parse_review(label, u):
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
    
    author = data[2][0] if len(data) > 2 and data[2] else "Unknown"
    avatar = None
    try:
        avatar = data[2][1][6][0]
    except Exception:
        pass
        
    review_text = None
    review_date = None
    rating = 5
    
    # Let's inspect data[7] if present
    if len(data) > 7 and data[7]:
        d7 = data[7]
        # data[7][2][0] is rating
        try:
            rating = d7[2][0]
        except Exception:
            rating = 5
        # data[7][1][3] is date
        try:
            review_date = d7[1][3]
        except Exception:
            pass
        # text is usually in d7[2][15][0][0]
        try:
            review_text = d7[2][15][0][0]
        except Exception:
            pass
            
    # If not found in data[7], search all strings in data
    def search_strings(o):
        nonlocal review_text, review_date
        if isinstance(o, str):
            if len(o) > 20 and not o.startswith('http') and not o.startswith('//') and not o.startswith('/maps') and not o.startswith('0ahUKE') and not o.startswith('ChI') and not o.startswith('CIH') and not o.startswith('0x') and 'Vicente Pires' not in o and 'Salão de baile' not in o and 'Espaco Lumier' not in o:
                if any(w in o.lower() for w in ['lugar', 'espaco', 'espaço', 'festa', 'casamento', 'atendimento', 'evento', 'maravilhoso', 'excelente', 'recomendo', 'equipe', 'bom', 'otimo', 'ótimo', 'lindo', 'agradavel', 'agradável']):
                    if review_text is None or len(o) > len(review_text):
                        review_text = o
                if 'atrás' in o or 'ano' in o or 'mês' in o:
                    review_date = o
        elif isinstance(o, list):
            for x in o:
                search_strings(x)

    search_strings(data)
    
    print(f"\n=================== {label} ===================")
    print(f"Author: {author}")
    print(f"Avatar: {avatar}")
    print(f"Rating: {rating} estrelas")
    print(f"Date: {review_date}")
    print(f"Review Text: {review_text}")
    
    return {
        'label': label,
        'author': author,
        'avatar': avatar,
        'rating': rating,
        'date': review_date,
        'quote': review_text,
        'url': u
    }

for label, u in urls:
    try:
        r = parse_review(label, u)
        all_data.append(r)
    except Exception as e:
        print(f"Error on {label}: {e}")

with open('scratch/google_reviews_final.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=2, ensure_ascii=False)
