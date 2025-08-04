#!/bin/bash
set -o errexit

# Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Collect all static files
echo "Running collectstatic..."
python manage.py collectstatic --no-input