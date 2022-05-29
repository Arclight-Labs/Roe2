#!/bin/sh
echo "Fetching environment variables..."
firebase functions:config:get > .runtimeconfig.json