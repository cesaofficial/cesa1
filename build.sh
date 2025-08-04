#!/bin/bash
set -o errexit

echo "--- Installing Python dependencies ---"
pip install -r requirements.txt

echo "--- Installing frontend dependencies ---"
cd frontend
npm install

echo "--- Building frontend ---"
npm run build
cd ..

echo "--- Preparing for Django ---"
# Create the destination folder for index.html
mkdir -p staticfiles 
# Copy the main HTML file to where Django can find it
cp frontend/dist/index.html staticfiles/

echo "--- Collecting static assets ---"
python manage.py collectstatic --no-input