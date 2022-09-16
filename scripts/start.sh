#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  yarn dev
fi