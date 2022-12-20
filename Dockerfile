FROM python:3-alpine
COPY . /home/
WORKDIR /home
CMD ["python3", "-m", "http.server", "5500"]