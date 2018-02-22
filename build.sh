#!/bin/bash

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
#nohup  npm start & > /srv/logs/atf/log1.js
export PID_DIR=/opt/live/apps/ATF
export PID_SERVER_FILE=$PID_DIR/atf-dev.pid
export PID_COMPILER_FILE=$PID_DIR/atf-compiler.pid
export LOG_PATH=/opt/live/apps/ATF/logs
export LOG_FILE=$LOG_DIR/server.log
forever stop ./bin/www
forever start -o $LOG_PATH/server_out.log -e $LOG_PATH/server_err.log ./bin/www
# forever start -o /opt/live/apps/ATF/logs/server_out.log -e /opt/live/apps/ATF/logs/server_err.log ./bin/www

cd microservices
echo "Starting microservice"
forever stop compiler.js
forever start -o $LOG_PATH/compiler_out.log -e $LOG_PATH/compiler_err.log compiler.js


