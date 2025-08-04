#!/bin/bash
set -o errexit

echo "--- INSTALLING ALL DEPENDENCIES ---"
pip install -r requirements.txt
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

# THE FIX IS ON THIS LINE! Change 'python' to 'python3'
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"