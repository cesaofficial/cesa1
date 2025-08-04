#!/bin/bash

# This line will print every command that is run, for maximum debugging
set -x
# This line will exit the script if any command fails
set -o errexit

echo "--- INSTALLING DEPENDENCIES ---"
pip3 install -r requirements.txt
cd frontend
npm install
cd ..

echo "--- BUILDING REACT FRONTEND ---"
cd frontend
npm run build
cd ..

echo "--- PREPARING DJANGO STATIC FILES ---"
# Create the staticfiles directory. This will be our final output folder.
mkdir -p staticfiles

# Copy the React app's main index.html into the staticfiles root
# This ensures Django's TEMPLATES DIRS setting can find it.
cp frontend/dist/index.html staticfiles/

# Run collectstatic. This will copy all assets (Django's, and React's from frontend/dist/assets)
# into the 'staticfiles' directory.
python3 manage.py collectstatic --no-input --clear

echo "--- BUILD SCRIPT COMPLETE. NOW RUNNING FINAL DIAGNOSTICS. ---"

# This is the most important part.
# We are listing the entire contents of the directory that Vercel will deploy.
# This will show us the final locations of all our files.
echo "--- FINAL FILE STRUCTURE OF 'staticfiles' DIRECTORY: ---"
ls -R staticfiles

echo "--- DIAGNOSTICS COMPLETE ---"