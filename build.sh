#!/bin/bash
set -o errexit

# The Install Command in Vercel's UI will handle Python packages.
# This script will now only handle the build steps.

echo "--- Building frontend ---"
cd frontend
npm install
npm run build
cd ..

echo "--- Preparing static files for Django ---"
# Create the destination folder for index.html
mkdir -p staticfiles
# Copy the main HTML file to where Django can find it
cp frontend/dist/index.html staticfiles/

echo "--- Collecting all static assets ---"
python manage.py collectstatic --no-input