#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Vercel's build environment requires specifying the Python version explicitly.
# We use python3.9 because it is the standard, stable runtime provided.

echo "Running database migrations..."
python3.9 manage.py migrate

echo "Collecting static files..."
python3.9 manage.py collectstatic --noinput --clear

echo "Build script completed successfully."