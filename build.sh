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
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"