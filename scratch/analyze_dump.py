import re

with open('scratch/maps_dump.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Hex id 0x935a count:', len(re.findall(r'0x935a32f61fec68cd', text)))
print('CID count:', len(re.findall(r'15800742111043760587', text))) # decimal of 0xdb473c431db6d1cb

# Search for any image links or arrays
photos = re.findall(r'https://lh[3-6]\.googleusercontent\.com/[^"\'\s<>]+', text)
print('Total lh urls:', len(photos))
for p in set(photos):
    print('URL:', p[:150])

# Look for RPC / photo batch identifiers
pb_matches = re.findall(r'/maps/preview/photo\?[^"\'\s<>]+', text)
print('Photo preview endpoints:', len(pb_matches))

# Look for window.APP_INITIALIZATION_STATE or similar
init_states = re.findall(r'window\.APP_INITIALIZATION_STATE\s*=\s*(\[.+?\]);', text)
print('Init states found:', len(init_states))
