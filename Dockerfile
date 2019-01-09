FROM node:8.11.1

# Create app directory
RUN mkdir -p /usr/src/fanz1st-media-api
WORKDIR /usr/src/fanz1st-media-api

# Install app dependencies
COPY package.json /usr/src/fanz1st-media-api
RUN npm install

# Bundle app source
COPY . /usr/src/fanz1st-media-api

# Build arguments
ARG NODE_VERSION=8.11.1

# Environment
ENV NODE_VERSION $NODE_VERSION