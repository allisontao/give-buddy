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
from .serializers import User_serializer
from .serializers import Saved_charities_serializer

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
        int_id = int(charity_id)

        charity_ref = database.child('charities').order_by_child('charity_id').equal_to(int_id).get()

        if charity_ref:
            charity_data = next(iter(charity_ref.val().values()))

            return Response(charity_data)
        else:
            return Response({"error": "Charity not found"}, status=404)
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Onboarding Endpoint
@api_view(['POST'])
# Request body contains user selection and returns matched charities
def onboarding(request, user_id):
    try:
      #validate request data before calling matching algorithm using serializer
      serializer = Onboarding_serializer(data=request.data)
      if serializer.is_valid():
          user_data = serializer.validated_data
          print(user_data)
          user_province = database.child('users').child(user_id).child('user_province').get().val()
          print('THIS IS USER PROVINCE', user_province)
          user_city = database.child('users').child(user_id).child('user_city').get().val()
          print('THIS IS USER CITY', user_city)
          charity_list = database.child('charities').get().val()
          if user_province is None:
              user_province = "ON"

          if user_city is None:
              user_city = "Toronto"
              
          user_selections = {
              'user_categories': user_data['categories'],
              'user_subcategories': user_data['subcategories'],
              'ft_ranking': user_data['ft_ranking'],
              'rr_ranking': user_data['rr_ranking'],
              'ctc_ranking': user_data['ctc_ranking'],
              'charities': charity_list,
              'province': user_province,
              'city': user_city
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

# My Charities Endpoints
@api_view(['GET'])
# Return all favourite charities user liked/saved
def my_charities(request, user_id):
    try:
        ref = database.child('users').child(user_id).get()
    
        if ref is not None:
            user_data = ref.val()
            if user_data:
                save = user_data.get('saved_charities')
                return Response(save)
            else:
                return Response({"error": "No Favourite Charity data for User"}, status=404)
        else:
            return Response({"error": "User data is empty"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
def saved_charities(request, user_id):
    try:
        serializer = Saved_charities_serializer(data=request.data)

        if serializer.is_valid():
            saved_charity_id = serializer.validated_data['saved_charity']

            saved_charities = database.child('users').child(user_id).child('saved_charities').get().val()
            if saved_charities:
                saved_charities_list = saved_charities if isinstance(saved_charities, list) else [saved_charities]
                if saved_charity_id in saved_charities_list:
                    return Response({"saved_charities": saved_charities_list})
                saved_charities_list.append(saved_charity_id)
            else:
                saved_charities_list = [saved_charity_id]

            database.child('users').child(user_id).child('saved_charities').set(saved_charities_list)
            return Response({"saved_charities": saved_charities_list})

        else:
            return Response({"error": serializer.errors}, status=400)    
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
        if update_donated_serializer.is_valid():
            donated_charity_id = update_donated_serializer.validated_data.get('donated_charity_id')
            donated_amount = update_donated_serializer.validated_data.get('donated_amount')

            current_dict = database.child('users').child(user_id).child('donated_to').get().val() or []
            print("CURRENT DICT", current_dict)

            for i in range(len(current_dict)):
                if donated_charity_id == current_dict[i][0]:
                    cur = current_dict[i]
                    if len(cur) == 1:
                        cur.append(donated_amount)
                        current_dict.pop(i)
                        current_dict.append(cur)
                        print(current_dict)
                        database.child('users').child(user_id).child('donated_to').set(current_dict)
                        return Response({'donated_to': current_dict})
                    else:
                        cur[1] += donated_amount
                        current_dict.pop(i)
                        current_dict.append(cur)
                        print(current_dict)
                        database.child('users').child(user_id).child('donated_to').set(current_dict)
                        return Response({'donated_to': current_dict})

            current_dict.append([donated_charity_id, donated_amount])

            database.child('users').child(user_id).child('donated_to').set(current_dict)
            return Response({'donated_to': current_dict})
        else:
            return Response(update_donated_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# For You Endpoint   
@api_view(['GET'])
# Return list of matched charities in groups of 5
def matched_for_you(request, user_id):
    try:
        match_param = request.query_params.get('match', 0)
        match = int(match_param)

        ref = database.child('users').child(user_id).get()

        if ref is not None:
            user_data = ref.val()
            if user_data:
                matched = user_data.get('matched_charities', [])
                start_index = match * 5
                end_index = (match * 5 + 4) + 1
                matched_group = matched[start_index:end_index]
                return Response(matched_group)
            else:
                return Response({"error": "No Matched Charity data for User"}, status=404)
        else:
            return Response({"error": "User data is empty"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
# User Endpoints
# User Registration Endpoint
@api_view(['POST'])
# Create entry in the user table
def user_registration(request):
    try:
        serializer = User_serializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data

            # Check if user with the same user_uid or email already exists
            existing_users = database.child('users').order_by_child('user_uid').equal_to(validated_data['user_uid']).get().val()
            if existing_users:
                return Response(existing_users)

            existing_users_email = database.child('users').order_by_child('email').equal_to(validated_data['email']).get().val()
            if existing_users_email:
                return Response(existing_users_email)

            new_user = {
                'email': validated_data['email'],
                'first_name': validated_data['first_name'],
                'last_name': validated_data['last_name'],
                'user_province': validated_data['user_province'],
                'user_city': validated_data['user_city'],
                'user_uid': validated_data['user_uid'],
            }

            user_ref = database.child('users').push(new_user)
            created_user_id = user_ref['name']
            created_user_data = database.child('users').child(created_user_id).get().val()
            
            response_data = {'user_id': created_user_id, 'user_data': created_user_data}
            return Response(response_data)
        else:
            return Response({"error": serializer.errors}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
# User Info Endpoint
@api_view(['GET'])
def user_info(request, user_uid):
    try:
        # Query the users table where 'user_uid' matches the provided UID
        user_ref = database.child('users').order_by_child('user_uid').equal_to(user_uid).get()

        if user_ref:
            # Get the auto-generated ID 
            user_id = next(iter(user_ref.val().keys()))

            # Get the user data
            user_data = next(iter(user_ref.val().values()))

            response_data = {'user_id': user_id, 'user_data': user_data}
            return Response(response_data)
        else:
            return Response({"error": "User not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)