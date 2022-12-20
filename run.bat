@echo off
docker compose up -d
start http://localhost:5500
echo Application is Running in the background