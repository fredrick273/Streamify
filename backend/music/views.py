import spotipy
import os
import subprocess
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

from django.conf import settings
from django.shortcuts import render
from .serializers import ArtistSerializer,SongSerializer,PlaylistSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from . import models
from django.http import HttpResponse

load_dotenv()

spotify_client_id = os.environ.get("SPOTIFY_CLIENT_ID")
spotify_client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")
auth_manager = SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

# Create your views here.

def home(request):
    return HttpResponse("Hello world")



def getsongdata(track):
    try:
        track_info = sp.track(track)
    except:
        return None
    songdata = {
            "track_name":track_info['name'],
            "id":track_info['id'],
            "artist_name":track_info['artists'][0]['name'],
            "artist_id":track_info['artists'][0]['id'],
            "album_name":track_info['album']['name'],
            "duration":track_info['duration_ms'],
            "url":track_info['album']['images'][0]['url']
        }
    print(songdata)
    return songdata

def getplaylistdata(track):
    try:
        playlist_info = sp.playlist(track)
    except:
        return None
    playlist_data = {
            "name" : playlist_info['name'],
            'id' : playlist_info['id'],
            'description' : playlist_info['description'],
            'image_url': playlist_info['images'][0]['url'],
            'track_urls': [i['track']['external_urls']['spotify'] for i in playlist_info['tracks']['items'] ],
            'track_ids': [i['track']['id'] for i in playlist_info['tracks']['items'] ] 
        }
    print(playlist_data)
    return playlist_data

class ArtistListView(generics.ListCreateAPIView):
    queryset = models.Artist.objects.all()
    serializer_class = ArtistSerializer

class ArtistView(generics.RetrieveAPIView):
    queryset = models.Artist.objects.all()
    lookup_field = 'pk'
    serializer_class = ArtistSerializer

class SongView(generics.RetrieveAPIView):
    queryset = models.Song.objects.all()
    lookup_field = 'pk'
    serializer_class = SongSerializer

class SongListView(generics.ListAPIView):
    queryset = models.Song.objects.all()
    serializer_class = SongSerializer

class SongCreateView(generics.CreateAPIView):
    queryset = models.Song.objects.all()
    serializer_class = SongSerializer
    def perform_create(self, serializer):
        track = self.request.data.get('spotify_url')
        data = getsongdata(track)
        if not data:
            raise ValidationError("Invalid Url")
        artist = None
        if models.Artist.objects.filter(artist_id = data["artist_id"]).exists():
            artist = models.Artist.objects.get(artist_id = data['artist_id'])
            if models.Song.objects.filter(song_id = data['id']).exists():
                raise ValidationError("Song Already Present")
        else:
            newartist = models.Artist(artist_id = data['artist_id'],name = data['artist_name'])
            newartist.save()
            artist = newartist
        try:
            subprocess.run(["spotdl", "--output", f"{os.path.join(settings.SONGS_ROOT , data['artist_id'],'{title}')}",track], check=True)
            print("Download successful")
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")

        serializer.save(artist=artist,name=data["track_name"],spotify_url=track,duration=data['duration'],song_id=data["id"])

        return Response(serializer.data)
    

class PlaylistView(generics.RetrieveAPIView):
    queryset = models.Playlist.objects.all()
    lookup_field = 'pk'
    serializer_class = PlaylistSerializer

class PlaylistListView(generics.ListCreateAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistCreateView(generics.CreateAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def perform_create(self, serializer):
        track = self.request.data.get('spotify_url')
        data = getplaylistdata(track)
        if not data:
            raise ValidationError("Invalid Url")
        
        songs = []
        for songurl in data['track_urls']:
            songdata = getsongdata(songurl)
            if models.Artist.objects.filter(artist_id = songdata["artist_id"]).exists():
                if models.Song.objects.filter(song_id = songdata['id']).exists():
                    song = models.Song.objects.get(song_id = songdata['id'])
                else:
                    artist = models.Artist.objects.get(artist_id = songdata['artist_id'])
                    new_song = models.Song(artist=artist,name=songdata['track_name'],spotify_url=track,duration=songdata['duration'],song_id = songdata['id'])
                    new_song.save()
                    song = new_song
                    try:
                        subprocess.run(["spotdl", "--output", f"{os.path.join(settings.SONGS_ROOT , songdata['artist_id'],'{title}')}",songurl], check=True)
                        print("Download successful")
                    except subprocess.CalledProcessError as e:
                        print(f"Error: {e}")
            else:
                artist = models.Artist(artist_id = songdata['artist_id'],name = songdata['artist_name'])
                artist.save()
                new_song = models.Song(artist=artist,name=songdata['track_name'],spotify_url=track,duration=songdata['duration'],song_id = songdata['id'])
                new_song.save()
                song = new_song
                try:
                    subprocess.run(["spotdl", "--output", f"{os.path.join(settings.SONGS_ROOT , songdata['artist_id'],'{title}')}",songurl], check=True)
                    print("Download successful")
                except subprocess.CalledProcessError as e:
                    print(f"Error: {e}")
            songs.append(song.pk)

        serializer.save(playlist_id=data['id'],name=data['name'],description=data['description'],songs=songs,image=data['image_url'])
        
        return Response(serializer.data)
    

    