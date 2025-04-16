# Bash 
# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

check_success() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: $1${NC}"
        exit 1
    fi
}

read -p "Enter the APP_VERSION: " APP_VERSION

# Check if APP_VERSION is empty
if [ -z "$APP_VERSION" ]; then
    echo -e "${RED}Error: APP_VERSION is required.${NC}"
    exit 1
fi

# Construct the image tag
IMAGE_TAG="dwaru/valltest-backend-app:${APP_VERSION}"

echo -e "${YELLOW}Searching dockerfile${NC}"
if [ ! -f dockerfile ]; then
    echo -e "${RED}Error: dockerfile not found. Create and configure it manually.${NC}"
    exit 1
fi

echo -e "${YELLOW}Building docker image with tag: ${IMAGE_TAG}...${NC}"
docker build -t "$IMAGE_TAG" ./
check_success "Couldn't build dockerfile. Check logs"
echo -e "${GREEN}Image builded succsesfully${NC}"

echo -e "${YELLOW}Pushing docker image to hub...${NC}"
docker push "$IMAGE_TAG"
check_success "Couldn't push image. Check logs"
echo -e "${GREEN}Image pushed to hub succsesfully with tag: ${IMAGE_TAG}${NC}"
