import json
import re

with open('scratch/app_init.txt', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'APP_INITIALIZATION_STATE\s*=\s*(\[.+?\]);', content)
data = json.loads(m.group(1))

for idx, item in enumerate(data):
    if isinstance(item, list):
        for sub in item:
            if isinstance(sub, str) and ")]}'" in sub:
                raw_json = sub[sub.index('['):]
                parsed = json.loads(raw_json)
                print(f"Found RPC at {idx}!")
                with open('scratch/parsed_rpc.json', 'w', encoding='utf-8') as pf:
                    json.dump(parsed, pf, indent=2, ensure_ascii=False)
                
                def extract_text(o):
                    if isinstance(o, str):
                        yield o
                    elif isinstance(o, list):
                        for x in o:
                            yield from extract_text(x)
                    elif isinstance(o, dict):
                        for x in o.values():
                            yield from extract_text(x)

                texts = [t for t in extract_text(parsed) if len(t) > 15 and not t.startswith('http') and not t.startswith('//')]
                print('Texts count:', len(texts))
                for t in texts:
                    print('TEXT:', t)
