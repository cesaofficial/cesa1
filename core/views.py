
from django.shortcuts import render
from .models import Department, TeamMember

def home(request):
    return render(request, 'core/home.html')

def event_list(request):
    #events = Event.objects.all().order_by('-date')
    return render(request, 'core/event_list.html')

def team_list(request):
    # Query 1: Get the Top Tier members (President, VP, etc.).
    top_tier = TeamMember.objects.filter(department__isnull=True).order_by('order')

    # Query 2: Get all departments, ordered correctly.
    departments = Department.objects.prefetch_related('members').all()

    context = {
        'top_tier': top_tier,
        'departments': departments,
    }
    return render(request, 'core/team_list.html', context)
def memories(request):

    return render(request, 'core/memories.html')
