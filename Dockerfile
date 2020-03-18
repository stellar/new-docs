FROM ubuntu:16.04 as build

MAINTAINER Carl Vitullo <carl@stellar.org>

RUN apt-get update && apt-get install -y curl wget git apt-transport-https && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_10.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

# Puppeteer workaround
# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/src

ADD package.json /app/src
ADD yarn.lock /app/src

RUN yarn

# Enumerate specific files for better docker build caching
COPY .eslintrc.js /app/src
COPY .babelrc /app/src
COPY gatsby-browser.js /app/src
COPY gatsby-config.js /app/src
COPY gatsby-node.js /app/src
COPY gatsby-ssr.js /app/src
COPY jsconfig.json /app/src
COPY buildHelpers /app/src/buildHelpers
COPY content /app/src/content
COPY plugins /app/src/plugins
COPY src /app/src/src

RUN yarn build

FROM nginx:1.17

COPY --from=build /app/src/public /usr/share/nginx/html/new-docs/public
COPY static /usr/share/nginx/html/new-docs/static
COPY nginx /etc/nginx/

