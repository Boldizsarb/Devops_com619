#!/bin/bash
set -e

# Environment variables
IMAGE_APP="dapsonic/devops_com619-devops:latest"
IMAGE_NGINX="dapsonic/devops_com619-nginx:latest"

# Pull the latest version of your application and NGINX images
docker pull $IMAGE_APP
docker pull $IMAGE_NGINX

# Stop and remove existing containers

docker stop myapp nginx || true
docker rm myapp nginx || true


# Start application container
docker run -d --name myapp --network=devops-net --restart unless-stopped -p 3000:3000 $IMAGE_APP

# Start NGINX container
docker run -d --name nginx --network=devops-net --restart unless-stopped -p 80:80 -p 443:443 \
  -v "/etc/letsencrypt:/etc/letsencrypt/" \
  -v "/home/com619/nginx.conf:/etc/nginx/nginx.conf" \
  $IMAGE_NGINX
