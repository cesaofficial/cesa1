#!/bin/bash
set -o errexit

# Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Collect all static files
echo "Running collectstatic..."
python manage.py collectstatic --no-input