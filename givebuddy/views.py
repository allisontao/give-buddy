from django.shortcuts import render
import pyrebase

config={
    "apiKey": "AIzaSyD0mEZexgDrJgkZGscEmJtc9BdGdg1U95U",
    "authDomain": "give-buddy.firebaseapp.com",
    "databaseURL": "https://give-buddy-default-rtdb.firebaseio.com",
    "projectId": "give-buddy",
    "storageBucket": "give-buddy.appspot.com",
    "messagingSenderId": "1021594813511",
    "appId": "1:1021594813511:web:d7ccae2dbd4c915d2f5d62",
    "measurementId": "G-KZXS7KCXPM"
}

firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

# Create your views here.
def index(request):
    name = database.child('Charity').child('Name').get().val()
    
    context = {
        'name':name,
    }
    return render(request, 'index.html', context)