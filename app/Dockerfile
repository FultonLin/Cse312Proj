FROM python:3.9.2-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt
CMD [ "flask", "run", "--host", "0.0.0.0" ]