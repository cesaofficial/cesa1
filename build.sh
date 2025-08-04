#!/bin/bash
set -o errexit

echo "--- INSTALLING ALL DEPENDENCIES ---"
pip3 install -r requirements.txt
cd frontend
npm install
cd ..

echo "--- BUILDING FRONTEND ---"
cd frontend
npm run build
cd ..

echo "--- PREPARING DJANGO DEPLOYMENT FILES ---"
mkdir -p staticfiles
cp frontend/dist/index.html staticfiles/

# --- THE CRITICAL FIX IS HERE ---
# Delete the old manifest file to prevent caching issues.
rm -f staticfiles/staticfiles.json

# Now, run collectstatic to create a fresh manifest and gather files.
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"