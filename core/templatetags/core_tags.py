# core/templatetags/core_tags.py

from django import template

register = template.Library()

@register.filter(name='multiply')
def multiply(value, arg):
    """
    Multiplies the given value by the argument.
    Usage: {{ value|multiply:arg }}
    """
    try:
        # Ensure both are numbers before multiplying
        return float(value) * float(arg)
    except (ValueError, TypeError):
        # If something goes wrong, return an empty string or the original value
        return ''