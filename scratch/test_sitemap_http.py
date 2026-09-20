import urllib.request

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirect)
for u in ['https://espacolumier.com.br/sitemap.xml', 'https://www.espacolumier.com.br/sitemap.xml']:
    try:
        res = opener.open(u, timeout=10)
        print(f'{res.status} {u}')
    except urllib.error.HTTPError as e:
        print(f'{e.code} {u} -> {e.headers.get("Location")}')
    except Exception as e:
        print(f'ERR {u}: {e}')
