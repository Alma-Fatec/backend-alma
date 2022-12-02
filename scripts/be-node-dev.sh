#!/bin/sh

echo "Install bash and execute 'wait-for-it.sh' script"
apk add --update bash

./scripts/wait-for-it.sh $DB_HOST:5432 --timeout=30 --strict -- echo "Postgres is up"

echo "Running migrations"

npm run typeorm:migration
npm run typeorm:up

echo "Running server"

npm run start:staging


