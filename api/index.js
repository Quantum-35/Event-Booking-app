const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const graphQlSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const isAuth = require('./middlewares/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);
app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

console.log(process.env.NODE_ENV);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to Db'))
  .catch(err => console.log('===>', err));
app.listen(3001, () => console.log('Server running at port 3001'));
