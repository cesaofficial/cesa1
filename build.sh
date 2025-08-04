#!/bin/bash
set -o errexit

# This script will be run by Vercel's "Build Command".
# The 'pip install' command will be run separately by Vercel's "Install Command".

echo "--- Building frontend ---"
cd frontend
npm install
npm run build
cd ..

echo "--- Preparing static files for Django ---"
# Create the staticfiles directory to be safe
mkdir -p staticfiles
# Manually copy the essential index.html to where Django's TEMPLATES setting will find it
cp frontend/dist/index.html staticfiles/

echo "--- Collecting all static assets ---"
# Use python3 to be explicit. This command will gather all static files
# (from Django's admin, and from your frontend's 'dist' folder)
# into the final 'staticfiles' directory.
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT COMPLETE ---"