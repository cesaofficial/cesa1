#!/bin/bash
set -e

# NOTE: Vercel automatically runs `pip install` before this script.
# We only need to run the Django-specific commands.

# Run database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput --clear