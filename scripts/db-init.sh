#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      SELECT * FROM pg_catalog.pg_tables;

EOSQL


# write a script to update a row in user table 

# Path: scripts/db-update.sh

#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   UPDATE users SET name = 'John' WHERE id = '1';
   SELECT * FROM users;
