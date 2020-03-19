FROM node:12.10.0-alpine

COPY ./dist ./dist
COPY tsconfig.json tslint.json package.json /
RUN yarn install --production && yarn cache clean

EXPOSE 5000
CMD [ "yarn", "start" ]
