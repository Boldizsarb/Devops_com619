#!/bin/bash
set -e

# Environment variables
IMAGE_APP="dapsonic/devops_com619-devops:latest"
IMAGE_NGINX="dapsonic/devops_com619-nginx:latest"
MYSQL_APP="dapsonic/mysql:5.7" 

# Pull the latest version of your application and NGINX images
docker pull $MYSQL_APP
docker pull $IMAGE_APP
docker pull $IMAGE_NGINX

# Create a network for the application
docker network create devops-net || true

# Create or ensure the volume exists
docker volume create mysql-data || true

# Stop and remove existing containers
docker stop myapp nginx mysql-devops || true
docker rm myapp nginx mysql-devops || true

# Start MYSQL database
docker run -d \
  --name mysql-devops \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=devops \
  -e MYSQL_USER=devops \
  -e MYSQL_PASSWORD=devops \
  -p 3306:3306 \
  $MYSQL_APP

# Wait for MySQL to fully start
echo "Waiting for MySQL to start..."
sleep 60

# Start application container
docker run -d --name myapp --network=devops-net --restart unless-stopped -p 3000:3000 $IMAGE_APP

# Waiting for the application to start
echo "Waiting for the application to start..."
sleep 10

# Start NGINX container
docker run -d --name nginx --network=devops-net --restart unless-stopped -p 80:80 -p 443:443 \
  -v "/etc/letsencrypt:/etc/letsencrypt/" \
  -v "/home/com619/nginx.conf:/etc/nginx/nginx.conf" \
  $IMAGE_NGINX
