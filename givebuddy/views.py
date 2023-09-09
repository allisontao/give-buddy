from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# firebase imports
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

# Landing
def index(request):
    return render(request, 'index.html')

# Charities Endpoints
@api_view(['GET'])
# Returns list of all charities
def charities(request):
    try:
        charity_list = database.child('charities').get().val()
        
        if charity_list is not None:
            context = {
                'charity_list': charity_list
            }
            return Response(context)
        else:
            return Response({"error": "No charities found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    
@api_view(['GET'])
# Returns specified charity based on charity id
def specific_charity(request, charity_id):
    try:
        ref = database.child('charities').child(charity_id).get()
    
        if ref is not None:
            charity_data = ref.val()
            if charity_data:
                return Response(charity_data)
            else:
                return Response({"error": "Charity data is empty"}, status=404)
        else:
            return Response({"error": "Charity data is empty"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
