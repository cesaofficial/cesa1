#!/bin/bash
set -o errexit

# The @vercel/static-build environment is guaranteed to have python3, pip, node, and npm.
# We use python3 and pip3 to be explicit and avoid any system path issues.

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
python3 manage.py collectstatic --no-input

echo "--- BUILD SCRIPT HAS COMPLETED SUCCESSFULLY ---"