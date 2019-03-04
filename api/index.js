const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const graphQlSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const isAuth = require('./middlewares/is-auth');

const app = express();

app.use(
  bodyParser.json(),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to Db'))
  .catch(err => console.log('===>', err));
app.listen(3001, () => console.log('Server running at port 3001'));
