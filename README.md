# give-buddy

## Setup

### Virtual Environment
All development work should be done in a virtual environment.

To create new virtual environment: `python -m venv env`

Activate virtual environment: `source ./env/bin/activate`

Leave virtual environment: `deactivate`

### Install packages
`pip install django djangorestframework django-cors-headers`

`pip install pyrebase4`

`pip install python-decouple`

### Setup env

Add `.env` file in the root with the firebase credentials (refer to: https://www.notion.so/kerrylkr19/Capstone-e62949620f35489e8f1878855fa41993?pvs=4)

Run the following commands to apply migrations:

`python manage.py makemigrations`

`python manage.py migrate`

### Run Server

`python manage.py runserver`

