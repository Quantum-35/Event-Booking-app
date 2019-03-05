import axiosConfig from '../../utils/axiosConfig';

import {
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    SIGNIN_FAILED,
    SIGNIN_SUCCESS,
    SIGNIN_USER
} from './constants';


export const signupUser = () => ({type: SIGNUP_USER});

export const signupFailed = (errors) => ({
    type: SIGNUP_FAILED,
    errors
});

export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload
});

export const signup = (payload: any) => (dispatch) => {
    dispatch(signupUser());
    const { username, email, password } = payload;
    const resBody = {
        query: `
            mutation {
                createUser(userInput: { username: "${username}", email: "${email}", password: "${password}" }) {
                    _id
                    email
                }
            }
        `
    };
    const inputData:any = JSON.stringify(resBody);
    console.log(inputData);
    axiosConfig('POST', '/graphql', inputData)
    .then(res => {
        if (res.status !== 200 && res.status !== 201){
            dispatch(signupFailed(res.data));
            throw new Error('Network Error');
        };
        if (res.data.errors) {
            console.log(res.data.errors[0])
            dispatch(signupFailed(res.data.errors[0]));
            return;
        }
        dispatch(signupSuccess(res.data));
    })
    .catch(error => {
        dispatch(signupFailed(error));
    })
};


// Login Actions

export const signinUser = () => ({ type: SIGNIN_USER });

export const signinFailed = (errors) => ({
    type: SIGNIN_FAILED,
    errors
});

export const signinSuccess = (signinData) => ({
    type: SIGNIN_SUCCESS,
    signinData
});

export const signin = (payload:any) => (dispatch) => {
    dispatch(signinUser());
    const {email, password, history} = payload;
    const resBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
        `
    };
    const inputData = JSON.stringify(resBody);
    axiosConfig('POST', '/graphql', inputData)
    .then(async (res) => {
        if (res.status !== 200 && res.status !== 201){
            dispatch(signupFailed('Network Error'));
            throw new Error('Network Error');
        };
        if (res.data.errors) {
            console.log(res.data.errors[0])
            dispatch(signinFailed(res.data.errors[0]));
            return;
        }
        await localStorage.setItem('userData', JSON.stringify(res.data));
        const udata:any = await localStorage.getItem('userData');
        const k = await JSON.parse(udata);
        console.log(k);
        await localStorage.setItem('access_token',k.data.login.token);
        dispatch(signinSuccess(res.data));
        history.push('/events');
    })
    .catch(error => {
        dispatch(signinFailed(error));
    })
}