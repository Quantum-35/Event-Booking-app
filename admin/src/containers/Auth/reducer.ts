import {
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    SIGNUP_USER,
    SIGNIN_FAILED,
    SIGNIN_SUCCESS,
    SIGNIN_USER
} from './constants';

export interface State {
    payload: [],
    errors: any,
    success: boolean,
    failed: boolean,
    loading: boolean
}

const initialState:State = {
    payload: [],
    errors: null,
    loading: false,
    success: false,
    failed: false
}

export default (state = initialState, action): State => {
    switch(action.type) {
        case SIGNUP_FAILED:
            return {
                ...state,
                failed: true,
                errors: action.errors
            };
        case SIGNUP_USER:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                payload: action.payload
            }
        case SIGNIN_FAILED:
            return {
                ...state,
                failed: true,
                errors: action.errors
            };
        case SIGNIN_USER:
            return {
                ...state,
                loading: true
            };
        case SIGNIN_SUCCESS:
            console.log(action.signinData)
            return {
                ...state,
                loading: false,
                success: true,
                payload: action.signinData
            }
        default:
            return {
                ...state
            };
    };
};