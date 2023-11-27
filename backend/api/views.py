from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import os
from .serializers import stockSerializer
from server.stock import predict_price
# Create your views here.


@api_view(['POST'])
def predict_view(request):
    if request.method == 'POST':
        print(request.data)
        # deserialize the input data from the request
        serializer = stockSerializer(data=request.data)
        if serializer.is_valid():
            # convert input data to input format for model
            input_data=tuple(serializer.validated_data.values())
            input_data_as_numpy_array = np.asarray(input_data)
            input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
            print(input_data_reshaped[0][0])
        #make a prediction
        historical_data,future_predictions,c,d = predict_price(input_data_reshaped[0][0],input_data_reshaped[0][1],input_data_reshaped[0][2])
        #return the prediction as a json respone
        output = {"historical_data":historical_data,"future_predictions":future_predictions,"loss":c,"valid":d}
        return Response(output)