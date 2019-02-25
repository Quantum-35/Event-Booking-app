const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./models/event');


const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    
    type Event {
      _id: ID!,
      title: String!
      description: String!,
      price: Float!
      date: String!
    }
   
    type RootQuery {
      events: [Event!]!
    }

    input EventInput {
      title: String!
      description: String!,
      price: Float!
      date: String!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then((events) => { 
          return events.map((event) => {
            return { ...event._doc, _id: event._doc._id.toString() };
          });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
      });
      return event.save()
        .then((result) => {
          return { ...result._doc }; // mongoose property that return the document object
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
  },
  graphiql: true,
}));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
app.listen(3001, () => console.log('Server running at port 3001'));
