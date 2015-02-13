#!/bin/bash
echo "Welcome"
while [ true ]
do
	nodejs /var/xo/server/run.js &>> run.log
	sleep 1
done
