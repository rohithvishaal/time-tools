FROM alpine

COPY . /home/

WORKDIR /home

RUN apk add python3 py3-pip

CMD ["python3", "-m", "http.server", "5500"]