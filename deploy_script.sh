#!/bin/bash

# Pull the latest version of your application image
docker pull dapsonic/devops_com619-devops:latest

# Pull the MySQL image
docker pull mysql:5.7

# Stop existing containers (if any)
docker stop myapp-db || true
docker rm -f myapp-db || true
docker stop myapp || true
docker rm -f myapp || true

# Start MySQL container
docker run -d --name myapp-db -e MYSQL_ROOT_PASSWORD=devops -e MYSQL_DATABASE=myappdb -p 3306:3306 mysql:5.7

# Start your application container
# Make sure to link it to the MySQL container or provide database connection information
docker run -d --name myapp --link myapp-db:mysql -p 80:80 dapsonic/devops_com619-devops:latest

# Wait for the services to start
sleep 10

# Run Certbot to obtain certificates, if needed
docker run --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 --name certbot certbot/certbot certonly --standalone --preferred-challenges http --agree-tos --email 5giwao61@solent.ac.uk -d comdevops.uksouth.cloudapp.azure.com

# Reload NGINX configuration to ensure it uses the obtained certificates
docker exec nginx nginx -s reload

# Reload NGINX configuration to ensure it uses the obtained certificates
docker exec nginx nginx -s reload
