import {
    FETCHING_EVENT,
    FETCHING_EVENT_FAILED,
    FETCHING_EVENT_SUCCESS } from './constants'

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
        default:
            return {...state}
    }
}