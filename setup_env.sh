#!/bin/bash

echo API_URL=$API_URL >> .env
echo NODE_ENV=$NODE_ENV >> .env
echo NODE_ENV=$NODE_ENV_TEST >> .env
echo SECRET=$SECRET_TEST >> .env
echo PORT=$PORT_TEST >> .env
echo PGHOST=$PGHOST_TEST >> .env
echo PGDATABASE=$PGDATABASE_TEST >> .env
echo PGPORT=$PGPORT_TEST >> .env
echo PGUSER=$PGUSER_TEST >> .env
echo PGPASSWORD=$PGPASSWORD_TEST >> .env
echo REDIS_HOST=$REDIS_HOST_TEST >> .env
echo REDIS_PORT=$REDIS_PORT_TEST >> .env
echo ROUND_SALT=8 >> .env
echo API_KEY=$API_KEY_TEST >> .env
echo PORT_TEST=$PORT_TEST >> .env
echo PGHOST_TEST=$PGHOST_TEST >> .env
echo PGDATABASE_TEST=$PGDATABASE_TEST >> .env
echo PGPORT_TEST=$PGPORT_TEST >> .env
echo PGUSER_TEST=$PGUSER_TEST >> .env
echo PGPASSWORD_TEST=$PGPASSWORD_TEST >> .env
echo REDIS_HOST_TEST=$REDIS_HOST_TEST >> .env
echo REDIS_PORT_TEST=$REDIS_PORT_TEST >> .env
echo USER_DOCS=$USER_DOCS_TEST >> .env
echo PASS_DOCS=$PASS_DOCS_TEST >> .env
echo EXPOSE_PORT=$PORT_TEST >> .env