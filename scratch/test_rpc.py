import urllib.request
import re
import json

with open('scratch/review1.html', 'r', encoding='utf-8') as f:
    html = f.read()

rpc_links = re.findall(r'href="([^"]+_rpc[^"]+)"', html)
print("Found RPC links:", len(rpc_links))
for l in rpc_links:
    print("RPC Link:", l[:150])

# Let's test fetching one of the rpc links on www.google.com
if rpc_links:
    rpc_url = "https://www.google.com" + rpc_links[0].replace('&amp;', '&')
    print("\nFetching RPC URL:", rpc_url[:120])
    req = urllib.request.Request(rpc_url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Referer': 'https://www.google.com/maps'
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print("RPC Content length:", len(content))
            with open('scratch/rpc_response.txt', 'w', encoding='utf-8') as f_out:
                f_out.write(content)
            # Find strings in content
            matches = re.findall(r'\"([^\"]{30,500})\"', content)
            print("Strings found:", len(matches))
            for m in matches[:10]:
                print(" ->", m)
    except Exception as e:
        print("Error fetching RPC:", e)
