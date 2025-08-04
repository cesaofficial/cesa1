# core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('events/', views.event_list, name='event_list'),
    #path('team/', views.team_list, name='team_list'),
    path('memories/', views.memories, name='memories'),
        
]