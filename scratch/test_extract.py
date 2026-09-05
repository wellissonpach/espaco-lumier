import re

with open('scratch/app_init.txt', 'r', encoding='utf-8') as f:
    text = f.read()
print('Length:', len(text))
lh = re.findall(r'https://lh[3-6]\.googleusercontent\.com/[^\s"\'<>]+', text)
print('LH URLs in app_init:', len(lh))
for x in list(set(lh))[:10]:
    print(' ', x[:100])
