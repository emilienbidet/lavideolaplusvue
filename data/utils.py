import requests
from requests.exceptions import SSLError


def url_exists(url):
    try:
        r = requests.head(url)
    except SSLError:
        return False
    return r.status_code == requests.codes.ok
