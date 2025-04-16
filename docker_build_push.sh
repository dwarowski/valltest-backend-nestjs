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

docker_login() {    
    echo -e "${YELLOW}Logging into Docker Hub...${NC}"
    read -p "Enter username: " DOCKER_USERNAME
    read -s -p "Enter password: " DOCKER_PASSWORD
    docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
    check_success "Docker login failed. Please check your credentials."
    echo -e "${GREEN}Successfully logged into Docker Hub.${NC}"
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
echo -e "${Green}dockerfile found${NC}"

echo -e "${YELLOW}Building docker image with tag: ${IMAGE_TAG}...${NC}"
docker build -t "$IMAGE_TAG" ./
check_success "Couldn't build dockerfile. Check logs"
echo -e "${GREEN}Image builded succsesfully${NC}"

echo -e "${YELLOW}Pushing docker image to hub...${NC}"
docker push "$IMAGE_TAG"
push_result=$?
if [ $push_result -ne 0 ]; then
  echo -e "${RED}Couldn't push image.  Attempting login...${NC}"
  docker_login  # Вызываем docker_login, если не удалось запушить образ
  docker push "$IMAGE_TAG"
  login_push_result=$?
  if [ $login_push_result -ne 0 ]; then
    check_success "Couldn't push image after login. Check logs"
  fi
else
  check_success "Couldn't push image. Check logs" # Хотя на самом деле, сюда не попадем если push был успешный
fi
echo -e "${GREEN}Image pushed to hub succsesfully with tag: ${IMAGE_TAG}${NC}"
