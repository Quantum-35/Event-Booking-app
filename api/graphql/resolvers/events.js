const Event = require('../../models/event');
const User = require('../../models/user');
const { convertRawDateToISO } = require('../../helpers');
const { transformEvent, getUser } = require('./mergeData');


module.exports = {
  events: () => {
    return Event.find()
      .then((events) => { 
        return events.map((event) => {
        // eslint-disable-next-line
        return transformEvent(event);
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createEvent: (args, req) => {
    if (!req.isAuth) throw new Error(' You are not Authorized to perform this action.');

    const newEvent = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvent;
    return newEvent.save()
      .then((result) => {
        // eslint-disable-next-line
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          date: convertRawDateToISO(result._doc.date),
          creator: getUser.bind(this, result._doc.creator),
        };
        return User.findById(req.userId);
      })
      .then((user) => {
        if (!user) {
          throw new Error('User with that ID does not exist');
        }
        user.createdEvents.push(createdEvent);
        return user.save();
      })
      .then(() => {
        return createdEvent;
      })
      .catch((err) => {
        throw err;
      });
  },
};
