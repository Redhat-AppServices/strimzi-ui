/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const kafkaHandlers = require('./kafka-service-handlers');
const topicHandlers = require('./strimzi-api-handlers');
const path = require('path');
var cors = require('cors');

const api = express();
api.use(express.json());
api.use(cors());

// define api
const kafkaAPI = new OpenAPIBackend({
  definition: path.join(__dirname, '../../openapi/kafka-service.yaml'),
});
const topicAPI = new OpenAPIBackend({
  definition: path.join(__dirname, '../../openapi/strimzi-admin.yaml'),
});

// register handlers
kafkaAPI.register(kafkaHandlers);
topicAPI.register(topicHandlers);

// register security handler
kafkaAPI.registerSecurityHandler('Bearer', (c, req, res) => {
  return true;

  // const authHeader = c.request.headers['authorization'];
  // if (!authHeader) {
  //   throw new Error('Missing authorization header');
  // }
  // const token = authHeader.replace('Bearer ', '');
  // return jwt.verify(token, 'secret');
});

// Skipping validation of the schema
// validation fails on this schema definition
// even though it is valid through other validation forms like Swagger.io
topicAPI.validateDefinition = () => {};

kafkaAPI.init();
topicAPI.init();

api.use((req, res) => {
  if (req.url.startsWith('/api/managed-services-api/v1')) {
    return kafkaAPI.handleRequest(req, req, res);
  } else if (req.url.startsWith('/api/managed-services-strimzi-ui/v1/api')) {
    req.url = req.url.replace('/api/managed-services-strimzi-ui/v1/api', '');
    return topicAPI.handleRequest(req, req, res);
  }
  res.status(405).status({ err: 'Method not allowed' });
});

api.listen(8000, () =>
  console.info('Kafka Service API listening at http://localhost:8000')
);
