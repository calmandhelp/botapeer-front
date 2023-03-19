FROM node:16

WORKDIR /app

ARG GITHUB_USER_NAME

ARG GITHUB_ACCESS_TOKEN

RUN git config --global submodule."src/botapeer-openapi".url https://${GITHUB_USER_NAME}:${GITHUB_ACCESS_TOKEN}@github.com/calmandhelp/botapeer-openapi.git

RUN git clone --branch main --single-branch https://${GITHUB_USER_NAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USER_NAME}/botapeer-front.git .

RUN git submodule update --init

RUN npm install --no-cache --legacy-peer-deps

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]