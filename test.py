import spotipy
import os
from spotipy.oauth2 import SpotifyClientCredentials

spotify_client_id = "377b8d0034224882a175db6277a2b167"
spotify_client_secret = "81f83c6e447c4d67ae6a544acfab5713"
auth_manager = SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

url = input()

try:
    playlist_info = sp.track(url)
    print(playlist_info['album']['images'][0]['url'])
except Exception as e:
    print(e)