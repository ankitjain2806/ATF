#!/usr/bin/env bash
cd client;
// npm install
ng build --prod
cd ..
cd server
// npm install
export NODE_ENV=development
npm start
