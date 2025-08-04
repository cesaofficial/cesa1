from django.shortcuts import render


def home(request):
    return render(request, 'core/home.html')

def event_list(request):
    #events = Event.objects.all().order_by('-date')
    return render(request, 'core/event_list.html')

def memories(request):
    return render(request, 'core/memories.html')

