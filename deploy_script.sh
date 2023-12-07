#!/bin/bash -ex

# Navigate to the directory containing your docker-compose.yml file
#cd "$(dirname "$0")"

# Print the current working directory and list files
pwd
ls -la

# Pull the latest images
docker-compose pull

# Stop and remove any previous containers
docker-compose down

# Start the services defined in docker-compose.yml
docker-compose up -d

# Wait for the services to start
sleep 10

# Run Certbot to obtain certificates, if needed
docker-compose run --rm certbot certonly --standalone --preferred-challenges http --agree-tos --email 5giwao61@solent.ac.uk -d comdevops.uksouth.cloudapp.azure.com

# Reload NGINX configuration to ensure it uses the obtained certificates
docker-compose exec nginx nginx -s reload
