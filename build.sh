#!/bin/bash
set -e
python3.9 manage.py migrate
python3.9 manage.py collectstatic --noinput --clear