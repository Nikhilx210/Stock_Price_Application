import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras
import matplotlib.dates as mdates
import pandas_datareader as pdr
import yfinance as yf
from datetime import datetime, timedelta


def predict_price(stock_name, start_date, end_date):

    # pip install yfinance

    yf.pdr_override()
    # Download historical data for SPY from Yahoo Finance
    spy = yf.download(stock_name, start=start_date, end=end_date)

    # Split data into training (2010-2020) and validation (2020-2023) sets
    training_data = spy['Adj Close']['2005-01-01':'2020-12-31']
    validation_data = spy['Adj Close']['2021-01-01':'2023-09-27']

    # Use 'Adj Close' prices as the stock price for training
    training_set = training_data.values.reshape(-1, 1)
    validation_set = validation_data.values.reshape(-1, 1)
    # Feature scaling using MinMaxScaler
    sc = MinMaxScaler(feature_range=(0, 1))
    training_set_scaled = sc.fit_transform(training_set)
    validation_set_scaled = sc.transform(validation_set)
    # Creating input sequences for training

    def create_sequences(data, seq_length=60):
        X = []
        y = []
        for i in range(seq_length, len(data)):
            X.append(data[i-seq_length:i, 0])
            y.append(data[i, 0])
        return np.array(X), np.array(y)

    X_train, y_train = create_sequences(training_set_scaled)
    X_validation, y_validation = create_sequences(validation_set_scaled)

    # Reshape inputs for LSTM model
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
    X_validation = np.reshape(
        X_validation, (X_validation.shape[0], X_validation.shape[1], 1))

    # Building the LSTM Model
    model = keras.Sequential()
    model.add(keras.layers.LSTM(units=50, return_sequences=True,
              input_shape=(X_train.shape[1], 1)))
    model.add(keras.layers.Dropout(0.2))
    model.add(keras.layers.LSTM(units=50, return_sequences=True))
    model.add(keras.layers.Dropout(0.2))
    model.add(keras.layers.LSTM(units=50, return_sequences=True))
    model.add(keras.layers.Dropout(0.2))
    model.add(keras.layers.LSTM(units=50))
    model.add(keras.layers.Dropout(0.2))
    model.add(keras.layers.Dense(units=1))

    # Compiling the LSTM Model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Training the Model and store history
    history = model.fit(X_train, y_train, epochs=50, batch_size=48,
                        validation_data=(X_validation, y_validation))

    # Plot loss and accuracy during training
    # plt.figure(figsize=(10, 5))
    # plt.plot(history.history['loss'], label='Training Loss')
    # plt.plot(history.history['val_loss'], label='Validation Loss')
    # plt.title('Model Loss')
    # plt.xlabel('Epoch')
    # plt.ylabel('Loss')
    # plt.legend()
    # plt.show()

    input_date = datetime.strptime(end_date, "%Y-%m-%d")
    # Calculate 60 days ago
    days_ago = input_date - timedelta(days=240)

    # Convert the result back to a string
    result_date_str = days_ago.strftime("%Y-%m-%d")
    spy_test = yf.download(stock_name, start=result_date_str, end=end_date)

    seq_length = 60
    # Initialize a sequence with historical data
    current_sequence = spy_test[-seq_length:]['Adj Close']
    current_sequence = current_sequence.values.reshape(-1, 1)
    current_sequence = sc.transform(current_sequence)
    current_sequence = np.array(current_sequence)

    future_predictions = []
    prediction_horizon = 90
    # Make predictions for the specified prediction horizon
    for _ in range(prediction_horizon):
        # Reshape current_sequence to match the model input shape
        current_sequence = np.reshape(
            current_sequence, (1, current_sequence.shape[0], 1))

        # Use the model to predict the next time step
        next_prediction = model.predict(current_sequence)

        # Append the prediction to the future_predictions list
        future_predictions.append(next_prediction[0, 0])

        current_sequence = np.squeeze(current_sequence)
        # Update the current_sequence by removing the oldest value and adding the new prediction
        current_sequence = np.append(
            current_sequence[1:], next_prediction[0, 0])  # Add the

    # future_predictions now contains predicted stock prices for the specified prediction horizon

    future_predictions = np.asarray(future_predictions)
    future_predictions = future_predictions.reshape(-1, 1)
    future_predictions = sc.inverse_transform(future_predictions)

    import matplotlib.pyplot as plt

    # Assuming you have historical data for the past and predicted data for the next 90 data points
    # Define historical data and predicted prices (adjust these as needed)
    historical_data = spy_test['Adj Close'].values.reshape(-1, 1)
    predicted_prices = future_predictions  # Take the first 90 predicted prices

    # Create indices for historical and predicted data
    historical_indices = range(len(historical_data))
    predicted_indices = range(len(historical_data), len(
        historical_data) + len(predicted_prices))
    
    return historical_data,future_predictions,history.history['loss'],history.history['val_loss']
    # # Visualize historical and predicted data on the same plot
    # plt.figure(figsize=(12, 6))

    # # Plot historical data
    # plt.plot(historical_indices, historical_data,
    #          color='black', label='Historical SPY Stock Price')

    # # Plot predicted data
    # plt.plot(predicted_indices, predicted_prices,
    #          color='green', label='Predicted SPY Stock Price')

    # plt.title('SPY Stock Price Prediction')
    # plt.xlabel('Index')
    # plt.ylabel('SPY Stock Price')
    # plt.legend()
    # plt.grid(True)  # Add gridlines for better visualization
    # plt.show()