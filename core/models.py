# core/models.py
from django.db import models

class Department(models.Model):
    """Represents a team or domain, like 'Creative Team' or 'Technical Team'."""
    name = models.CharField(max_length=100, unique=True)
    order = models.PositiveIntegerField(default=0, help_text="Order of display on page (0 first, then 1, etc.)")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    """A member of the CESA committee, designed for hierarchical display."""

    # This field is the KEY to sorting members WITHIN a department.
    # The number prefix ensures correct sorting in the database.
    ROLE_CHOICES = [
        ('1_lead', 'Lead'),
        ('2_jt_lead', 'Jt. Lead'),
        ('3_member', 'Member'),
    ]

    # --- CORE FIELDS ---
    name = models.CharField(max_length=100)
    # This is the title that will be displayed on the card, e.g., "President", "Creative Lead".
    title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='team_photos/')
    student_class = models.CharField(max_length=2, choices=[('BE', 'BE'), ('TE', 'TE'), ('SE', 'SE')], default='SE')
    
    # --- HIERARCHY & GROUPING FIELDS ---
    # Members of the main committee (President, VP) will have this field as NULL (blank).
    department = models.ForeignKey(
        Department, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='members',
        help_text="Select the department. Leave BLANK for President, VP, Treasurer."
    )
    # This role determines the order INSIDE a department group.
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES, 
        blank=True, # Allow blank for main committee
        help_text="Role within the department (Lead, Jt. Lead, etc.)."
    )
    # This field sorts the Top Tier (President=0, VP=1, etc.) and is a tie-breaker.
    order = models.PositiveIntegerField(default=0, help_text="Sort order: President=0, VP=1. For others, lower numbers first.")

    # --- SOCIALS ---
    instagram_link = models.URLField(max_length=200, blank=True)
    linkedin_link = models.URLField(max_length=200, blank=True)

    class Meta:
        # This multi-level ordering is what creates the entire hierarchy!
        ordering = ['order', 'role', 'name']

    def __str__(self):
        return f"{self.name} ({self.title})"