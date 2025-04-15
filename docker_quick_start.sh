#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Set SED_INPLACE depending on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_INPLACE=(-i '')
else
    SED_INPLACE=(-i)
fi

# Function to check if the last command was successful
check_success() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: $1${NC}"
        exit 1
    fi
}

# Generate a 6-digit password
generate_password() {
    printf "%06d" $RANDOM
}

generate_jwt_secret() {
    openssl rand -base64 32
}

# Step 1: Read configuration from prod.env
echo -e "${YELLOW}Reading configuration from prod.env...${NC}"
if [ ! -f prod.env ]; then
    echo -e "${RED}Error: prod.env not found. Create and configure it manually.${NC}"
    exit 1
fi
source prod.env

# Step 2: Generate password if not set
if [ -z "$POSTGRES_PASSWORD" ]; then
    POSTGRES_PASSWORD=$(generate_password)
    if grep -q "^POSTGRES_PASSWORD=" prod.env; then
        sed "${SED_INPLACE[@]}" "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=${POSTGRES_PASSWORD}/" prod.env
    else
        echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >>prod.env
    fi
    echo -e "${GREEN}Generated PostgreSQL password: ${POSTGRES_PASSWORD}${NC}"
fi

if [ -z "$JWT_SECRET" ]; then
    JWT_SECRET=$(generate_jwt_secret)
    if grep -q "^JWT_SECRET=" prod.env; then
        sed "${SED_INPLACE[@]}" "s#^JWT_SECRET=.*#JWT_SECRET=${JWT_SECRET}#" prod.env
    else
        echo "JWT_SECRET=${JWT_SECRET}" >> prod.env
    fi
    echo -e "${GREEN}Generated JWT Secret:: ${JWT_SECRET}${NC}"
fi

# Step 3: Remove conflicting containers if they exist
CONTAINERS=("postgres-db" "valtest-backend-app")
for CONTAINER in "${CONTAINERS[@]}"; do
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
        echo -e "${YELLOW}Removing existing container '${CONTAINER}'...${NC}"
        docker rm -f ${CONTAINER} || check_success "Failed to remove conflicting container '${CONTAINER}'"
    else
        echo -e "${GREEN}No conflicting container '${CONTAINER}' found.${NC}"
    fi
done

# -------------------------------------------------------
# Launch docker compose
echo -e "${YELLOW}Starting docker-compose.yml ...${NC}"
docker-compose -f docker-compose.yml --env-file prod.env up -d
check_success "Containers failed to start"
echo -e "${GREEN}Containers started successfully.${NC}"

# Check application health
echo -e "${YELLOW}Checking application health...${NC}"
for i in {1..10}; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT}/api)
    if [ "$STATUS" == "200" ]; then
        echo -e "${GREEN}Application is running!${NC}"
        echo -e "${GREEN}Database parameters:${NC}"
        echo "Username: ${POSTGRES_USER}"
        echo "Password: ${POSTGRES_PASSWORD}"
        echo "Port: 5432"
        echo "JWT Secret: ${JWT_SECRET}"
        echo -e "${GREEN}Useful links:${NC}"
        echo "- Swagger: http://localhost:7777/api"
        exit 0
    fi
    echo -e "${YELLOW}Waiting for the application to start (${i}/10)...${NC}"
    sleep 5
done

echo -e "${RED}Application failed to start. Check logs:${NC}"
docker-compose logs valtest
exit 1
