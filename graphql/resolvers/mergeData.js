const Event = require('../../models/event');
const User = require('../../models/user');
const { convertRawDateToISO } = require('../../helpers');

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: convertRawDateToISO(event._doc.date),
    creator: getUser.bind(this, event.creator),
  };
};

const getEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const fetchSingleEvent = async (eventId) => {
  try {
    const fetchedEvent = await Event.findOne({ _id: eventId });
    return transformEvent(fetchedEvent);
  } catch (error) {
    throw error;
  }
};

const getUser = (userId) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) throw new Error('user with that Id Does not exist');
      // eslint-disable-next-line
        return {
        ...user._doc,
        password: NaN,
        _id: user.id,
        createdEvents: getEvents.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

exports.transformEvent = transformEvent;
exports.getEvents = getEvents;
exports.fetchSingleEvent = fetchSingleEvent;
exports.getUser = getUser;
