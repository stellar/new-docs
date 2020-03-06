FROM ubuntu:16.04 as build

MAINTAINER SDF Ops Team <ops@stellar.org>

RUN apt-get update && apt-get install -y curl wget git apt-transport-https
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
RUN echo "deb https://deb.nodesource.com/node_10.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y nodejs yarn

# Puppeteer workaround
# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app/src

ADD package.json /app/src
ADD yarn.lock /app/src

RUN yarn

# Enumerate specific files for better docker build caching
ADD .eslintrc.js /app/src
ADD .babelrc /app/src
ADD gatsby-browser.js /app/src
ADD gatsby-config.js /app/src
ADD gatsby-node.js /app/src
ADD gatsby-ssr.js /app/src
ADD jsconfig.json /app/src
ADD buildHelpers /app/src/buildHelpers
ADD content /app/src/content
ADD plugins /app/src/plugins
ADD src /app/src/src

RUN yarn build

ADD nginx /app/src

FROM nginx:1.17

COPY --from=build /app/src/public/* /usr/share/nginx/html/new-docs/public/
COPY static/* /usr/share/nginx/html/new-docs/static/
COPY nginx /etc/nginx/

