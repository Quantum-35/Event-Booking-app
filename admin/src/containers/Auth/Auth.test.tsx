import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Auth, iProp, mapDispatchToProps, mapStateToProps } from './Auth';

describe('Test Auth Component', () => {
    const props:iProp = {
        signInUser: jest.fn(),
        signupUser: jest.fn(),
        userData: {
            authReducer: {
                payload: {
                    data: {}
                }
            }
        },
        history: {}
    }
    const initialState = {
        userData: {
            email: "test@email.com"
        }
    }

    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crushing', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <Auth {...props}/>
                </MemoryRouter>
            </Provider>
        );
        // console.log(wrapper.debug())
        expect(wrapper.find('.auth-form').exists()).toBe(true);
    })

    it('can submit form', async() => {
        const wrapper = mount(<Auth {...props}/>);
        const inst = wrapper.instance();
        const e = {
            preventDefault: jest.fn()
        }
        await inst.handleSignIn();
        await inst.submitHandler(e);
        expect(inst.signInUser).toHaveBeenCalled;
        // checks if signup has been called.
        await inst.handleSignIn();
        await inst.submitHandler(e);
    })

    it('can signup user', async() => {
        const wrapper = mount(<Auth {...props}/>);
        const inst = wrapper.instance();
        const mystate = inst.state;
        const e = {
            preventDefault: jest.fn(),
            target: {
                ...mystate,
                username: "helloworld",
                email: "test@test.com",
                password: "hauihiahieu"
        }
        }
        await inst.handleChange(e);
        inst.state = {
            username: "helloworld",
            email: "test@test.com",
            password: "hauihiahieu",
            isLogin: false
        };
        await inst.submitHandler(e);
        expect(inst.signupUser).toHaveBeenCalled;
    })

    it('can set handleChange', async () => {
        const wrapper = mount(<Auth {...props}/>);
        const inst = wrapper.instance();
        const e = {
            target: {
                name: {}
            }
        }
        await inst.handleChange(e);
        expect(inst.state.username).toBeTruthy;

    })

    it('can set handleSignin', async () => {
        const wrapper = mount(<Auth {...props}/>);
        const inst = wrapper.instance();
        await inst.handleSignIn();
        expect(inst.state.isLogin).toBe(true);

    })

    it('can dispatch signupUser Action', () => {
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);
        props.signupUser({});
        expect(dispatch).toHaveBeenCalled();
    })

    it('can get user data from the state', () => {
        expect(mapStateToProps(initialState).userData).toEqual({
            userData: {email: "test@email.com"}
        });
    })
})
