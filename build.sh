#!/bin/bash

# Exit on error
set -o errexit

echo "Building frontend..."
# Navigate into the frontend directory
cd frontend

# Install dependencies and build the project
npm install
npm run build

# Navigate back to the root directory
cd ..

echo "Installing Python dependencies..."
# Install Python dependencies
pip install -r requirements.txt

echo "Running collectstatic..."
# Run Django's collectstatic
python manage.py collectstatic --no-input