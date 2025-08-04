#!/bin/bash
set -o errexit

echo "--- STARTING BUILD SCRIPT ---"

echo "Step 1: Building frontend..."
cd frontend
npm install
npm run build
cd ..
echo "--- Frontend build complete. ---"

# --- NEW DIAGNOSTIC STEP ---
echo "DIAGNOSTIC: Listing contents of the frontend build output directory..."
# This will show us if index.html was created.
ls -R frontend/dist
echo "--- End of build output listing. ---"

# --- NEW DIAGNOSTIC STEP ---
echo "DIAGNOSTIC: Listing contents of the project root directory before running Django commands..."
# This will show us the complete file structure.
ls -la
echo "--- End of root directory listing. ---"

echo "Step 2: Installing Python dependencies..."
pip install -r requirements.txt
echo "--- Python dependencies installed. ---"

echo "Step 3: Running collectstatic..."
python manage.py collectstatic --no-input
echo "--- COLLECTSTATIC COMPLETE ---"