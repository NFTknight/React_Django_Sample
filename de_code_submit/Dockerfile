FROM python:3.10

# show the stdout and stderr streams right in the command line instead of getting buffered.
ENV PYTHONUNBUFFERED 1

ADD requirements.txt /app/requirements.txt

ADD . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install default-jdk -y

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]