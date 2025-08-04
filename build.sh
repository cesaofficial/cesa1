#!/bin/bash
set -o errexit

echo "--- BUILDING FRONTEND ---"
cd frontend
npm install
npm run build
cd ..

echo "--- PREPARING DJANGO STATIC FILES ---"
# Create the staticfiles directory to ensure it exists
mkdir -p staticfiles
# Manually copy the essential index.html to where Django can find it at runtime
cp frontend/dist/index.html staticfiles/

# Run collectstatic to gather all JS, CSS, and other assets
python manage.py collectstatic --no-input

echo "--- BUILD SCRIPT COMPLETE ---"