const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { convertRawDateToISO } = require('../../helpers');
const { fetchSingleEvent, getUser } = require('./mergeData');


module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: getUser.bind(this, booking._doc.user),
          event: fetchSingleEvent.bind(this, booking._doc.event),
          createdAt: convertRawDateToISO(booking._doc.createdAt),
          updatedAt: convertRawDateToISO(booking._doc.updatedAt),
        };
      });
    } catch (error) {
      throw error;
    }
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
        createdAt: convertRawDateToISO(results._doc.createdAt),
        updatedAt: convertRawDateToISO(results._doc.updatedAt),
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
        creator: getUser.bind(this, booking.event._doc.creator),
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return bookedEvent;
    } catch (error) {
      throw error;
    }
  },
};
