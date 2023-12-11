from django.urls import reverse
from .models import Artist,Song,Playlist
from rest_framework import serializers


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id','artist_id','name']


class SongSerializer(serializers.ModelSerializer):
    song_url = serializers.SerializerMethodField()

    class Meta:
        model = Song
        fields = '__all__'
        read_only_fields = ['artist', 'name', 'duration', 'song_id', 'song_url']

    def get_song_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('home'))+"songs/" + f"{obj.artist.artist_id}/{obj.name}.mp3"
        return None


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'
        read_only_fields = ['playlist_id','name','description']

    songs = SongSerializer(many=True, read_only=True)