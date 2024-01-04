# framework imports
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from decouple import config 
# firebase imports
import pyrebase
# file imports
from backend.scripts.matching_algorithm import match_charities
from .models import User
from .serializers import Onboarding_serializer
from .serializers import Updated_donated_charities_serializer

config={
    "apiKey": config("apiKey"),
    "authDomain": config("authDomain"),
    "databaseURL": config("databaseURL"),
    "projectId": config("projectId"),
    "storageBucket": config("storageBucket"),
    "messagingSenderId": config("messagingSenderId"),
    "appId": config("appId"),
    "measurementId": config("measurementId")
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

@api_view(['POST'])
# Request body contains user selection and returns matched charities
def onboarding(request, user_id):
    try:
    #validate request data before calling matching algorithm using serializer
        serializer = Onboarding_serializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            # charity_list = database.child('charities').get().val()
            user_selections = {
                'categories': user_data['categories'],
                'subcategories': user_data['subcategories'],
                'ft_ranking': user_data['ft_ranking'],
                'rr_ranking': user_data['rr_ranking'],
                'ctc_ranking': user_data['ctc_ranking'],
                # TODO: change this back to the charities from charity database after the database is set up
                'charities': user_data['charities']
            }
            user_matched_charities = match_charities(**user_selections)
            matched_charities_json = {
                'user_matched_charities': user_matched_charities
            }
            # update matched charity info into the database
            database.child('users').child(user_id).child('matched_charities').set(user_matched_charities)
            return Response(matched_charities_json)
        else:
            return Response({"error": "User selections not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
# Return all favourite charities user liked/saved
def my_charities(request, user_id):
    try:
        ref = database.child('users').child(user_id).get()
    
        if ref is not None:
            user_data = ref.val()
            if user_data:
                fav = user_data.get('fav_charities')
                return Response(fav)
            else:
                return Response({"error": "No Favourite Charity data for User"}, status=404)
        else:
            return Response({"error": "User data is empty"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
# Return all charities user donated to
def my_donated_charities(request, user_id):
    try:
        ref = database.child('users').child(user_id).get()

        if ref is not None:
            user_data = ref.val()
            if user_data:
                donated = user_data.get('donated_to')
                return Response(donated)
            else:
                return Response({"error": "No Donated Charity data for User"}, status=404)
        else:
            return Response({"error": "User data is empty"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
# update user's donated to list
def update_donated_charities(request, user_id):
    try:
        update_donated_serializer = Updated_donated_charities_serializer(data=request.data)
        # validate request data before updating database using serializer
        if update_donated_serializer.is_valid():
            # obtain user's current donated to list
            current_list = database.child('users').child(user_id).child('donated_to').get().val() or []
            # user input
            insert_id = update_donated_serializer.validated_data.get('donated_charity_id')
            insert_amount = update_donated_serializer.validated_data.get('donated_amount')
            insert_list = [insert_id, insert_amount]
            final_list = current_list + [insert_list]
            # update database
            database.child('users').child(user_id).child('donated_to').set(final_list)
            return Response({'donated_to': final_list})
        else:
            return Response(update_donated_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=500)