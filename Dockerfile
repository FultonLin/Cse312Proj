FROM python:3.8.6
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
EXPOSE 8000
CMD [ "app.py" ]