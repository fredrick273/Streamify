from django.urls import path
from . import views

urlpatterns = [
    path('artists/',views.ArtistListView.as_view(),name='artists'),
    path('artists/<int:pk>/',views.ArtistView.as_view(),name='artist'),

    path('songs/',views.SongListView.as_view({'get': 'list'}),name='songs'),
    path('songs/add/',views.SongCreateView.as_view(),name='addsongs'),
    path('songs/<int:pk>/',views.SongView.as_view(),name='song'),

    path('playlist/',views.PlaylistListView.as_view(),name='playlists'),
    path('playlist/add/',views.PlaylistCreateView.as_view(),name='addplaylist'),
    path('playlist/<int:pk>/',views.PlaylistView.as_view(),name='playlist'),
]