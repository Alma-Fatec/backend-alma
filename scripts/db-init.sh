#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB" <<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   SELECT * FROM pg_catalog.pg_tables;
   UPDATE public.user SET role='Admin' WHERE email = 'admin@alma.com';
EOSQL
