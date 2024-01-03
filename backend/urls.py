from django.contrib import admin
from django.urls import path
from givebuddy import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='landing'),
    path('charities/', views.charities, name='charities'),
    path('charities/<str:charity_id>/', views.specific_charity, name='specific_charity'),
    path('onboarding', views.onboarding, name='onboarding'),
    path('my_charities/<str:user_id>', views.my_charities, name='my_charities'),
    path('my_donated_charities/<str:user_id>', views.my_donated_charities, name='my_donated_charities')
]
