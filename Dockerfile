FROM python:3.7

WORKDIR /app

COPY ./ /app

COPY requirements.txt app/requirements.txt

RUN pip install --upgrade pip

RUN pip install -r app/requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

