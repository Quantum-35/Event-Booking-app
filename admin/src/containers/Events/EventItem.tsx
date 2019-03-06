import React from 'react';

import './Events.css';

const EventItem = (props) => {
    const {title, description, date} = props.data;
  return (
    <div>
      <ul className="events-list">
        <div className="events-list__title">{title}</div>
        <div className="events-list__description">{description}</div>
        <div className="events-list__date">{date}</div>
      </ul>
    </div>
  )
}

export default EventItem
