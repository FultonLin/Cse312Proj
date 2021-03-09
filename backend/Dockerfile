FROM python:3
#directory
RUN mkdir /backend
WORKDIR /backend
#pip installs of needed things
COPY requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT [ "flask" ]
CMD [ "run", "--host=0.0.0.0" ]