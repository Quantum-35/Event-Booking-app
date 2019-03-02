const eventsResolver = require('../resolvers/events');
const bookingResolver = require('../resolvers/booking');
const authResolver = require('../resolvers/auth');

const rootResolver = {
  ...eventsResolver,
  ...bookingResolver,
  ...authResolver,
};

module.exports = rootResolver;
