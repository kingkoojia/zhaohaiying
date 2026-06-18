import urllib.request, json, os, zipfile, io

# Test if requests module is available
try:
    import requests
    print("requests available")
except:
    print("no requests")

# Test if we can reach netlify API
try:
    r = urllib.request.urlopen("https://api.netlify.com/api/v1/", timeout=5)
    print("Netlify API reachable")
except Exception as e:
    print(f"Cannot reach Netlify API: {e}")
