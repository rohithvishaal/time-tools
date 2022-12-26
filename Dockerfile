FROM python:3-alpine
COPY . /home/
WORKDIR /home/src
CMD ["python3", "-m", "http.server", "5500"]