# Stock Price Prediction Application

## Overview
A full-stack web application that predicts stock prices using LSTM (Long Short-Term Memory) neural networks. The application features a Django REST API backend with TensorFlow/Keras for machine learning and a React frontend for visualization.

## Features
- Historical stock data retrieval using Yahoo Finance API
- 90-day stock price predictions using LSTM neural networks
- Interactive charts showing historical prices and predictions
- Model performance visualization
- User-friendly interface for stock selection and date range input

## Tech Stack
### Backend
- Django REST Framework
- TensorFlow/Keras (LSTM Neural Networks)
- NumPy and Pandas for data processing
- Yahoo Finance API for stock data
- SQLite database

### Frontend
- React.js
- Chakra UI for styling
- CanvasJS for charts
- Context API for state management

## Project Structure
Stock_Price_Application/
├── backend/
│ ├── server/
│ │ ├── stock.py # LSTM model and prediction logic
│ │ └── ...
│ ├── api/ # Django REST API endpoints
│ ├── manage.py
│ └── db.sqlite3
│
└── frontend/
├── src/
├── public/
├── package.json
└── README.md


## Installation

### Backend Setup
1. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Run migrations
```bash
python manage.py migrate
```

4. Start the Django server
```bash
python manage.py runserver
```

### Frontend Setup
1. Install Node.js dependencies
```bash
cd frontend
npm install
```

2. Start the React development server
```bash
npm start
```

## Usage
1. Access the application at `http://localhost:3000`
2. Enter a stock symbol (e.g., "AAPL" for Apple)
3. Select the date range for historical data
4. Submit to view predictions and visualizations

## Model Architecture
The LSTM neural network consists of:
- 4 LSTM layers with 50 units each
- Dropout layers (0.2) for regularization
- Dense output layer for price prediction
- Adam optimizer with Mean Squared Error loss function

## API Endpoints
- POST `/api/predict/`
  - Parameters:
    - stock_name: Stock ticker symbol
    - start_date: Start date for historical data
    - end_date: End date for historical data
  - Returns:
    - Historical stock prices
    - Predicted future prices
    - Training/validation loss metrics

## Data Processing
1. Historical data retrieval from Yahoo Finance
2. Data normalization using MinMaxScaler
3. Sequence creation with 60-day lookback window
4. Train-validation split (2005-2020 for training, 2021-2023 for validation)

## Visualization
- Interactive stock price chart showing:
  - Historical price data
  - 90-day price predictions
- Model performance chart displaying:
  - Training loss
  - Validation loss

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Requirements
- Python 3.8+
- Node.js 14+
- npm 6+

## Dependencies
### Backend
- Django==4.2
- djangorestframework
- tensorflow
- numpy
- pandas
- yfinance
- scikit-learn
- matplotlib

### Frontend
- React 18
- Chakra UI
- CanvasJS
- Axios


## Acknowledgments
- Yahoo Finance API for providing historical stock data
- TensorFlow and Keras documentation
- Django REST Framework documentation
- React.js documentation

## Contact
[Nikhil] - [nikhilrathee736@gmail.com]

Project Link: [https://github.com/Nikhilx210/Stock_Price_Application](https://github.com/Nikhilx210/Stock_Price_Application)
