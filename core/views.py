import os
from django.http import HttpResponse
from django.shortcuts import render
from .models import Department, TeamMember

def home(request):
    
def home(request):
    # This is a temporary view for debugging the production environment.
    db_url = os.environ.get('DATABASE_URL', '--- DATABASE_URL NOT FOUND ---')
    secret_key_exists = "Yes" if os.environ.get('SECRET_KEY') else "No"
    
    html_response = f"""
    <h1>Vercel Production Environment Debug</h1>
    <p>This page is showing the environment variables from the live server.</p>
    <hr>
    <h2>DATABASE_URL:</h2>
    <p style="font-family: monospace; background-color: #f0f0f0; padding: 10px; border: 1px solid #ccc;">{db_url}</p>
    <hr>
    <h2>SECRET_KEY Exists?</h2>
    <p>{secret_key_exists}</p>
    """
    
    return HttpResponse(html_response)

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
