const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const graphQlSchema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: resolvers,
  graphiql: true,
}));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
app.listen(3001, () => console.log('Server running at port 3001'));
