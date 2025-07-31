#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -o errexit

echo "Building the project..."

# 1. Upgrade pip and install dependencies
# This is more robust: it calls pip through the python interpreter
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo "Dependencies installed."

# 2. Collect static files
# This gathers all your static files (CSS, JS, images) into the STATIC_ROOT directory
echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Static files collected."

# 3. Run database migrations
# This applies any database changes
echo "Applying database migrations..."
python manage.py migrate

echo "Build finished."