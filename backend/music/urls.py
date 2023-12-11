from django.urls import path
from . import views

urlpatterns = [
    path('artists/',views.ArtistListView.as_view(),name='artists'),

    path('songs/',views.SongListView.as_view(),name='songs'),
    path('songs/add/',views.SongCreateView.as_view(),name='addsongs'),
    path('songs/<int:pk>/',views.SongView.as_view(),name='addsongs'),

    path('playlist/',views.PlaylistView.as_view(),name='playlist')
]