#!/usr/bin/env bash

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
nohup  npm start & > log1.js

cd microservices
echo "Starting microservice"
nohup node compiler.js & > log2.js


