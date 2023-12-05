#!/bin/bash

# Navigate to the directory containing your docker-compose.yml file
cd "$(dirname "$0")"

# Pull the latest images
docker pull

# Stop and remove any previous containers
docker down

# Start the stack as defined in docker-compose.yml
docker up 


# Run Certbot to obtain certificates, if needed
# Uncomment the following lines if you need to obtain certificates
docker run --rm certbot certonly --standalone --preferred-challenges http --agree-tos --email 5giwao61@solent.ac.uk -d com619devops.uksouth.cloudapp.azure.com


# Wait for the services to start
sleep 10

# Reload NGINX configuration to ensure it uses the obtained certificates
docker exec nginx nginx -s reload
