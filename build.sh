#!/bin/bash

# This line will print every command that is run, for maximum debugging
set -x
# This line will exit the script if any command fails
set -o errexit

echo "--- CHECKING SYSTEM VERSIONS ---"
python3 --version
node --version
npm --version

echo "--- INSTALLING ALL DEPENDENCIES ---"
# Use python3 and pip3 to be explicit
python3 -m pip install -r requirements.txt
cd frontend
npm install
cd ..

echo "--- BUILDING FRONTEND ---"
cd frontend
npm run build
cd ..

echo "--- PREPARING DJANGO DEPLOYMENT FILES ---"
# Create the staticfiles directory to ensure it exists
mkdir -p staticfiles
# Copy the built index.html into the directory that Django will use
cp frontend/dist/index.html staticfiles/

# Run collectstatic using python3
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"