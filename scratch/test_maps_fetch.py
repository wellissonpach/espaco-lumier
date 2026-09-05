import urllib.request
import re

url = 'https://www.google.com/maps/place/Espaco+Lumier/@-15.802027,-48.0427106,3a,84.6y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC-ipHv8QE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWnbAuRWwt2gkgXxk95gq24PQf3RN-nJxcW6MwKNiTPocFJ-gyAwOHdiVuHP39KZIVh7JuYzx_xyjBPU-xk5LRZoFaDLj8Rwk9fOUa6FQYBC3SgKrvQzQJq85MRshCtdtc_gd6wVfQ%3Dw203-h135-k-no!7i960!8i640!4m18!1m8!3m7!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!2sEspaco+Lumier!8m2!3d-15.8020342!4d-48.042887!10e5!16s%2Fg%2F11b6j772rg!3m8!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!8m2!3d-15.8020342!4d-48.042887!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11b6j772rg?entry=ttu'

req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
})

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Fetched HTML length:', len(html))
        urls = set(re.findall(r'https://lh[3-6]\.googleusercontent\.com/[^\s"\'\<\>]+', html))
        print('Found googleusercontent URLs:', len(urls))
        for u in list(urls)[:10]:
            print('Sample URL:', u[:120])
except Exception as e:
    print('Error:', e)
