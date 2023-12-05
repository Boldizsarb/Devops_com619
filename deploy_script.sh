#!/bin/bash

# Navigate to the directory containing your docker-compose.yml file
cd "$(dirname "$0")"

# Pull the latest images
docker-compose pull

# Stop and remove any previous containers
docker-compose down

# Start the stack as defined in docker-compose.yml
docker-compose up -d


# Run Certbot to obtain certificates, if needed
# Uncomment the following lines if you need to obtain certificates
docker-compose run --rm certbot certonly --standalone --preferred-challenges http --agree-tos --email 5giwao61@solent.ac.uk -d com619devops.uksouth.cloudapp.azure.com


# Wait for the services to start
sleep 10

# Reload NGINX configuration to ensure it uses the obtained certificates
docker-compose exec nginx nginx -s reload
