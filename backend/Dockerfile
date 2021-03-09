FROM python:3
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT [ "flask" ]
CMD [ "run", "--host=0.0.0.0" ]