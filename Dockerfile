FROM ubuntu:16.04 as build

MAINTAINER Carl Vitullo <carl@stellar.org>

RUN apt-get update && apt-get install -y curl wget git apt-transport-https && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_14.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

# Puppeteer workaround
# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/src

ADD package.json yarn.lock /app/src/

RUN yarn

# Enumerate specific files for better docker build caching
COPY .eslintrc.js .babelrc gatsby-browser.js gatsby-config.js gatsby-node.js gatsby-ssr.js jsconfig.json /app/src/
COPY buildHelpers /app/src/buildHelpers
COPY content /app/src/content
COPY plugins /app/src/plugins
COPY src /app/src/src

ARG AMPLITUDE_KEY
RUN yarn build

FROM nginx:1.17

COPY --from=build /app/src/public /usr/share/nginx/html/new-docs/public
COPY static /usr/share/nginx/html/new-docs/static
COPY nginx /etc/nginx/

