#!/usr/bin/env bash
git pull
cd client
npm install
ng build --prod
cd..
cd server
npm install
export NODE_ENV=development
#npm start
nohup  npm start & > log1.js

