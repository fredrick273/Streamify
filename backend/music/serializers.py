from django.urls import reverse
from .models import Artist,Song,Playlist
from rest_framework import serializers

import spotipy
import os
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

load_dotenv()

spotify_client_id = os.environ.get("SPOTIFY_CLIENT_ID")
spotify_client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")
auth_manager = SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret)
sp = spotipy.Spotify(auth_manager=auth_manager)


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id','artist_id','name']


class SongSerializer(serializers.ModelSerializer):
    song_url = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    artist_name = serializers.SerializerMethodField()
    class Meta:
        model = Song
        fields = '__all__'
        read_only_fields = ['artist', 'name', 'duration', 'song_id', 'song_url']
    
    def get_artist_name(self,obj):
        return obj.artist.name

    def get_song_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('home'))+"songs/" + f"{obj.artist.artist_id}/{obj.name}.mp3"
        return None
    
    def get_image(self,obj):
        try:
            track_info = sp.track(obj.song_id)
            return track_info['album']['images'][0]['url']
        except:
            return "not found"


class PlaylistSerializer(serializers.ModelSerializer):
    pic = serializers.SerializerMethodField()
    class Meta:
        model = Playlist
        fields = '__all__'
        read_only_fields = ['playlist_id','name','description','image']

    songs = SongSerializer(many=True, read_only=True)

    def get_pic(self,obj):
        try:
            playlist_info = sp.playlist(obj.playlist_id)
            return playlist_info['images'][0]['url']
        except:
            return "Invalid url"