#!/bin/bash

echo "Fetching updates from repository"
git pull
export PATH=/usr/local/bin
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
#npm start
#nohup  npm start & > /srv/logs/atf/log1.js
export PID_DIR=/opt/live/apps/ATF
export PID_SERVER_FILE=$PID_DIR/atf-dev.pid
export PID_COMPILER_FILE=$PID_DIR/atf-compiler.pid
export LOG_PATH=/opt/live/apps/ATF/logs
export LOG_FILE=$LOG_DIR/server.log
echo "Stopping server"
forever stop ./bin/www
echo "Stopping server done!!!"
echo "Starting the server"
forever start -o $LOG_PATH/server_out.log -e $LOG_PATH/server_err.log ./bin/www
echo "Starting the server done!!!"
# forever start -o /opt/live/apps/ATF/logs/server_out.log -e /opt/live/apps/ATF/logs/server_err.log ./bin/www

cd microservices
echo "Stopping microservice"
forever stop compiler.js
echo "Stopping microservice done!!!"
echo "Starting microservice"
forever start -o $LOG_PATH/compiler_out.log -e $LOG_PATH/compiler_err.log compiler.js
echo "Starting microservice done!!!"

echo "Stopping transaction microservice"
forever stop transaction.js
echo "Stopping transaction microservice done!!!"
echo "Starting transaction microservice"
forever start -o $LOG_PATH/transaction_out.log -e $LOG_PATH/transaction_err.log transaction.js
echo "Starting transaction microservice done!!!"


