from django.contrib import admin
from .models import Department, TeamMember # CORRECTED IMPORT

# If you had an EventAdmin class here, remove it.

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    search_fields = ('name',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'department', 'role', 'order')
    list_filter = ('department', 'role', 'student_class')
    search_fields = ('name', 'title')
    list_editable = ('order', 'role')
    autocomplete_fields = ['department']