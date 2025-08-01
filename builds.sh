#!/bin/bash

# Activate virtual environment (if needed)
# source venv/bin/activate

# Run migrations and collect static files
python manage.py migrate
python manage.py collectstatic --noinput
