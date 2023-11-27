from django.urls import path
from . import views
urlpatterns = [
    # url path for prediction
    path('predict/',views.predict_view,name='predict')
]
