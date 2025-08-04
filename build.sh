#!/bin/bash
set -o errexit

# Install Python dependencies first
pip install -r requirements.txt

# Now, build the frontend
cd frontend
npm install
npm run build
cd ..

# Collect all static files
python manage.py collectstatic --no-input