#!/bin/bash
set -o errexit

echo "--- INSTALLING ALL DEPENDENCIES ---"
# Install Python dependencies
pip install -r requirements.txt
# Install frontend dependencies
cd frontend
npm install
cd ..

echo "--- BUILDING FRONTEND ---"
# Build the frontend
cd frontend
npm run build
cd ..

echo "--- PREPARING DJANGO STATIC FILES ---"
# Create the staticfiles directory and copy index.html
mkdir -p staticfiles
cp frontend/dist/index.html staticfiles/

# Run collectstatic
python manage.py collectstatic --no-input

echo "--- BUILD SCRIPT COMPLETE ---"