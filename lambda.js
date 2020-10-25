'use strict'
//This file is AWS Lambda entry point
//All your business code (ExpressJS App) should be done in src/app.js
//Should this fail, move over to index.js

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');
const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);