from django.db import models
# Create your models here.

class Artist(models.Model):
    artist_id = models.CharField(max_length=100,unique=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Song(models.Model):
    artist = models.ForeignKey(Artist,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    duration = models.IntegerField()
    song_id = models.CharField(max_length=100,unique=True)
    spotify_url = models.CharField(max_length=300)

    def __str__(self):
        return str(str(self.artist)+ " - " + self.name)


class Playlist(models.Model):
    playlist_id = models.CharField(max_length=100,null=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    spotify_url = models.CharField(max_length=300)
    songs = models.ManyToManyField(Song, related_name='playlists')

    def __str__(self):
        return self.name

