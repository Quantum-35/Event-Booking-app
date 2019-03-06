import {
    FETCHING_EVENT,
    FETCHING_EVENT_FAILED,
    FETCHING_EVENT_SUCCESS,
    CREATING_EVENT,
    CREATING_EVENT_FAILED,
    CREATING_EVENT_SUCCESS
 } from './constants'
import { stat } from 'fs';

export interface State {
    payload: [],
    errors: any,
    success: boolean,
    failed: boolean,
    loading: boolean
}

const initialState: State = {
    payload: [],
    errors: null,
    loading: false,
    success: false,
    failed: false
}

export default (state = initialState, action): State => {
    switch(action.type) {
        case FETCHING_EVENT:
            return {
                ...state,
                loading: true
            }
        case FETCHING_EVENT_FAILED:
            return {
                ...state,
                failed: true,
                errors: action.errors
            }
        case FETCHING_EVENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                payload: action.payload
            }
        case CREATING_EVENT:
            return {
                ...state,
                loading: true,
            }
        case CREATING_EVENT_FAILED:
            return {
                ...state,
                failed: true,
                errors: action.createEventErrors
            }
        case CREATING_EVENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                payload: action.createEventData
            }
        default:
            return {...state}
    }
}