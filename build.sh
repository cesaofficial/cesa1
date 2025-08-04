#!/bin/bash
set -o errexit

echo "--- INSTALLING ALL DEPENDENCIES ---"
# Install Python dependencies first
pip install -r requirements.txt
# Then, install frontend dependencies
cd frontend
npm install
cd ..

echo "--- BUILDING FRONTEND ---"
# Build the React application
cd frontend
npm run build
cd ..

echo "--- PREPARING DJANGO DEPLOYMENT FILES ---"
# Create the staticfiles directory to ensure it exists
mkdir -p staticfiles
# Manually copy the essential index.html to where Django can find it at runtime
cp frontend/dist/index.html staticfiles/

# Run collectstatic using python3
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"