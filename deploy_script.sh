#!/bin/bash
set -e

# Pull the latest version of your application image
docker pull dapsonic/devops_com619-devops:latest

# Pull the MySQL image
docker pull mysql:5.7

# Stop existing containers (if any)
docker stop myapp-db || true && docker rm myapp-db || true
docker stop myapp || true && docker rm myapp || true

# Start MySQL container
docker run -d --name myapp-db -e MYSQL_ROOT_PASSWORD=devops -e MYSQL_DATABASE=myappdb -p 3306:3306 mysql:5.7

# Start your application container
docker run -d --name myapp --link myapp-db:mysql -p 3000:3000 dapsonic/devops_com619-devops:latest

# Wait for the services to start
sleep 10

# Stop Nginx if it's running to free up port 80
docker stop nginx || true && docker rm nginx || true

# Run Certbot container to obtain certificates
#docker run --rm \
#  -v "/etc/letsencrypt:/etc/letsencrypt" \
#  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
#  -p 80:80 \
#  certbot/certbot certonly \
#  --standalone \
#  --preferred-challenges http \
#  --agree-tos \
#  --email 5giwao61@solent.ac.uk \
#  -d comdevops.uksouth.cloudapp.azure.com

# Start Nginx container with mounted volumes for SSL
docker run -d --name nginx \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  -v "/home/com619/nginx.conf:/etc/nginx/nginx.conf" \
  -p 80:80 \
  -p 443:443 \
  nginx:latest

