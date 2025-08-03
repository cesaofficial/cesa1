#!/bin/bash

# Exit on error
set -e

# We must install packages ourselves because the UI is ignored
python3.9 -m pip install -r requirements.txt

# Run migrations
python3.9 manage.py migrate

# Collect static files
python3.9 manage.py collectstatic --noinput --clear