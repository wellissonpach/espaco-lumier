import urllib.request
import re
import json

urls = [
  'https://maps.app.goo.gl/ifztngM8dpNusn6e9',
  'https://maps.app.goo.gl/jCwgFWAJZDxCBzf47',
  'https://maps.app.goo.gl/P3HvsUbWEkyb6Ag86',
  'https://maps.app.goo.gl/qDE6Wo3AaG5QyHe38',
  'https://maps.app.goo.gl/usN8zvLRU48uMcwJ9',
  'https://maps.app.goo.gl/phZfCc5SXpbGJWVYA'
]

headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
}

for i, u in enumerate(urls, 1):
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')
            
            title = re.findall(r'<meta property="og:title" content="([^"]+)"', html)
            desc = re.findall(r'<meta property="og:description" content="([^"]+)"', html)
            
            print(f"=== REVIEW {i} ===")
            print("URL:", u)
            print("Final URL:", final_url)
            print("Title:", title[0] if title else "None")
            print("Desc:", desc[0] if desc else "None")
            
            # Look for review text in JS data
            # Typically in google maps: ["Review text here", ...] or similar
            matches = re.findall(r'\"([^\"]{30,800})\"', html)
            keywords = ['espaço', 'espaco', 'festa', 'casamento', 'atendimento', 'evento', 'maravilhoso', 'excelente', 'recomendo', 'equipe', 'buffet', 'lugar', 'lindo', 'noiva', 'aniversário']
            candidates = []
            for m in matches:
                # filter out urls, js code, css
                if '<' in m or '{' in m or 'http' in m or 'function' in m:
                    continue
                score = sum(1 for kw in keywords if kw in m.lower())
                if score >= 1:
                    candidates.append((score, m))
            
            candidates.sort(key=lambda x: x[0], reverse=True)
            print("Candidates:")
            seen = set()
            for score, cand in candidates[:5]:
                if cand not in seen:
                    seen.add(cand)
                    print(f"  [{score}] {cand}")
            print()
    except Exception as e:
        print(f"Error on {i}: {e}")
