import {
    FETCHING_EVENT,
    FETCHING_EVENT_FAILED,
    FETCHING_EVENT_SUCCESS,
    CREATING_EVENT,
    CREATING_EVENT_FAILED,
    CREATING_EVENT_SUCCESS
 } from './constants';

import axiosConfig from '../../utils/axiosConfig';

export const fetchingEvent = () => ({type: FETCHING_EVENT});

export const fetchEventFailed = (errors) => ({
    type: FETCHING_EVENT_FAILED,
    errors
});

export const fetchEventSuccess = (payload) => {
    return ({
    type: FETCHING_EVENT_SUCCESS,
    payload
})};

export const creatingEvent = () => ({type: CREATING_EVENT});

export const creatingEventFailed = (errors) => ({
    type: CREATING_EVENT_FAILED,
    createEventErrors: errors
});

export const creatingEventSuccess = (payload) => ({
    type: CREATING_EVENT_SUCCESS,
    createEventData: payload
});


export const fetchEvent = (payload=null) => (dispatch) => {
    dispatch(fetchingEvent());
    const resData = {
        query: `
            query {
                events {
                    _id
                    title
                    date
                    description
                    creator {
                    _id
                    email
                    password
                    createdEvents {
                        title
                        creator {
                        username
                        }
                    }
                    }
                }
            }
        `
    }
    axiosConfig('POST', '/graphql', JSON.stringify(resData))
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            dispatch(fetchEventFailed(res.data));
        }
        if(res.data.errors) {
            dispatch(fetchEventFailed(res.data.errors[0]));
            return;
        }
        dispatch(fetchEventSuccess(res.data));
    })
    .catch(error => {
        dispatch(fetchEventFailed(error));
    })
}

export const createEvent = (payload) => (dispatch) => {
    const { title, newPrice, date, description, history } = payload;
    dispatch(creatingEvent());
    const resBody = {
        query: `
            mutation {
                createEvent(eventInput: { title: "${title}", description: "${description}", price: ${newPrice}, date: "${date}" }) {
                    _id
                    title
                    description
                    date
                    creator {
                        email
                    }
                }
            }
        `
    };
    const token = localStorage.getItem('access_token');
    // axiosConfig('POST', '/graphql', JSON.stringify(resBody))
    fetch(`${process.env.REACT_APP_BASE_URL}graphql`, {
        method: 'POST',
        body: JSON.stringify(resBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            dispatch(creatingEventFailed(res));
        }
        return res.json();
    })
    .then(res => {
        if(res.errors) {
            dispatch(creatingEventFailed(res.errors));
            return;
        }
        dispatch(creatingEventSuccess(res.data));
        history.push('/events');
    })
    .catch(error => {
        dispatch(creatingEventFailed(error));
    })
}