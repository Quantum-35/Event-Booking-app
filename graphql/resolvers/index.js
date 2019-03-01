const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const event = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });
  } catch (error) {
    throw error;
  }
};

const fetchSingleEvent = async (eventId) => {
  try {
    const event = await Event.findOne({ _id: eventId });
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event.creator),
    };
  } catch (error) {
    throw error;
  }
};

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) throw new Error('user with that Id Does not exist');
      // eslint-disable-next-line
        return {
        ...user._doc,
        password: NaN,
        _id: user.id,
        createdEvents: event.bind(this, user._doc.createdEvents)
      };
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => { 
        return events.map((event) => {
        // eslint-disable-next-line
        return {
            ...event._doc,
            _id: event._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: fetchSingleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: (args) => {
    const newEvent = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5c73ffdb600bfe193e3d30c4',
    });
    let createdEvent;
    return newEvent.save()
      .then((result) => {
        // eslint-disable-next-line
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
        return User.findById('5c73ffdb600bfe193e3d30c4');
      })
      .then((user) => {
        if (!user) {
          throw new Error('User with that ID does not exist');
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(() => {
        return createdEvent;
      })
      .catch((err) => {
        throw err;
      });
  },
  createUser: (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error('User with that Email already exist');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  bookEvent: async (args) => {
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Booking({
        user: '5c73ffdb600bfe193e3d30c4',
        event: fetchedEvent,
      });
      const results = await newBooking.save();
      return {
        ...results._doc,
        _id: results.id,
        createdAt: new Date(results._doc.createdAt).toISOString(),
        updatedAt: new Date(results._doc.updatedAt ).toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById({ _id: args.bookingId }).populate('event');
      const bookedEvent = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator),
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return bookedEvent;
    } catch (error) {
      throw error;
    }
  },
};
