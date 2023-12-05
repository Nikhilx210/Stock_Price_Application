FROM python:3.11.0
WORKDIR /app
COPY . .
RUN pip install --upgrade pip
RUN pip install tensorflow
RUN pip install pybuilder
RUN python3 -c "import tensorflow as tf; print(tf.reduce_sum(tf.random.normal([1000, 1000])))"
RUN pip install -r requirements.txt 
EXPOSE 8000
CMD ["python","manage.py","runserver","0.0.0.0:8000"]