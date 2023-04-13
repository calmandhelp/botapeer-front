.PHONY: build
build:
	@export $(shell grep -v '^#' .env.production.local | xargs) && \
	docker build \
	 --build-arg GITHUB_ACCESS_TOKEN=$$GITHUB_ACCESS_TOKEN \
	 --build-arg GITHUB_USER_NAME=$$GITHUB_USER_NAME \
	 -t botapeer-front-ecr-prod . \
	 --no-cache