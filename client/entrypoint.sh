#!/bin/bash

function join_by { local IFS="$1"; shift; echo "$*"; }

# Find vue env vars
#vars=$(env | grep VUE_APP_ | awk -F = '{print "$"$1}')
#vars=$(join_by ',' $vars)
#echo "Found variables $vars"

#for file in /usr/share/nginx/html/js/app.*;
#do
 # echo "Processing $file ...";
  

  # Use the existing JS file as template
  #cp $file $file.tmpl
  #envsubst "$vars" < $file.tmpl > $file
  
  #rm $file.tmpl

  #sed -i "s/##VUE_APP_HOST_BACKEND_A/$VUE_APP_HOST_BACKEND_A/g" $file
  #sed -i "s/##VUE_APP_HOST_WEBSOCKET_A/$VUE_APP_HOST_BACKEND_A/g" $file

#done




nginx -g 'daemon off;'