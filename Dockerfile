FROM node:11

RUN apt-get update -y && \
    apt-get install -y chromedriver && \
    apt-get clean autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

CMD ["yarn", "test"]