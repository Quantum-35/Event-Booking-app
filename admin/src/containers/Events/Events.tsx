import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchEvent, createEvent  } from './actions';
import Modal from '../../components/Modal/Modal';
import BackDrop from '../../components/Backdrop/Backdrop';
import './Events.css';
import EventItem from './EventItem';

export interface iProps {
  fetchEvents: (body: any) => void;
  createEvent: (body: any) => void;
  events: any;
  history: any;
}

export class Events extends PureComponent<iProps> {
  state = {
    createEvent: false,
    title: null,
    price: null,
    date: null,
    description: null
  }

  componentDidMount() {
    const { fetchEvents } = this.props;
    try {
      fetchEvents(null);
    } catch (error) {
      throw error;
    }
  }

  handleOnChange = (e) => {
    const {name, value}: any = e.target;
    this.setState({
      [name]: value
    });
  }

  handleCreateEvent = () => {
    this.setState({createEvent: true});
  }

  handleCancel = () => {
    this.setState({createEvent: false});
  }

  handleConfirm = async() => {
    const {title, price, date, description} = this.state;
    const { createEvent } = this.props;
    if (!title || !price || !date || !description) {
      console.log('Fields above can not be null');
      return;
    }
    try {
      const newPrice =parseFloat(price).toFixed(2);
      const history = this.props;
      const data = {
        title,
        newPrice,
        date,
        description,
        history
      }
      await createEvent(data);
      this.setState({createEvent: false});
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { createEvent } = this.state;
    const { payload } = this.props.events.eventReducer;
    let eventsData;
    if(payload.data){
      eventsData = payload.data.events.slice(0).reverse().map(event => {
        return <EventItem key={event._id} data={event}/>
      });
    }
    return (
      <React.Fragment>
        {createEvent && <BackDrop />}
        {createEvent && <Modal title="Add Event"canCancel canConfirm onCancel={this.handleCancel} onConfirm={this.handleConfirm}>
          <form className="event-form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" required onChange={this.handleOnChange}/>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" id="price" required onChange={this.handleOnChange}/>
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" name="date" id="date" required onChange={this.handleOnChange}/>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" cols={85} rows={7} required onChange={this.handleOnChange}></textarea>
            </div>
          </form>
        </Modal>}
        <div className="events-control">
          <p>Share your own Events !!!</p>
          <button className="btn-create-event" onClick={this.handleCreateEvent}>Create event</button>
        </div>
        {eventsData}
      </React.Fragment>
    )
  }
}

export const mapStateToProps = state => ({
  events: state
});
export const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents: fetchEvent,
  createEvent
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);