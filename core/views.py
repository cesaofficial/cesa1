
from django.shortcuts import render
from .models import Event, TeamMember

def home(request):
    return render(request, 'core/home.html')

def event_list(request):
    events = Event.objects.all().order_by('-date')
    return render(request, 'core/event_list.html', {'events': events})

def team_list(request):
    team_members = TeamMember.objects.all()
    return render(request, 'core/team_list.html', {'team_members': team_members})

def memories(request):

    return render(request, 'core/memories.html')
