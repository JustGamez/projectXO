#!/bin/bash
echo "Welcome"
while [ true ]
do
	nodejs /var/www/xo/server/run.js &>> run.log
	sleep 1
done
