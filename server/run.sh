#!/bin/bash
echo "Welcome"
while [ true ]
do
	nodejs run.js &>> run.log
	sleep 1
done
