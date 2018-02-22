#!/usr/bin/env bash

export PATH=/usr/local/bin
echo "Fetching updates from repository"
git pull
cd client
echo "Updating client npm"
npm install
echo "Building code for production"
ng build --prod
cd ..
cd server
echo "Updating server npm"
npm install
export NODE_ENV=development
echo "Starting the server"
#npm start
nohup  npm start & > /srv/logs/atf/log1.js

cd microservices
echo "Starting microservice"
nohup node compiler.js & > /srv/logs/atf/log2.js


