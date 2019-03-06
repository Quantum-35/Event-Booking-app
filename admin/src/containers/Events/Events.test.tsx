import React from 'react';
import {mount, shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Events, iProps, mapStateToProps, mapDispatchToProps } from './Events';

describe('it can test Booking', () => {
    const props:iProps = {
        fetchEvents: jest.fn(),
        createEvent: jest.fn(),
        events: {
            eventReducer: {
                payload: {
                    data: {
                        events: []
                    }
                }
            }
        },
        history: {}
    }
    const initialState = {}
    let store;
    const mockStore = configureStore();
    
    beforeEach(() => {
        store = mockStore(initialState);
    })

    it('can render without crushing', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <Events {...props}/>
                </MemoryRouter>
            </Provider>
        );
        // console.log(wrapper.debug())
        expect(wrapper.find('.events-control').exists()).toBe(true);
    })
    it('can dispatch fetchEvent Action', () => {
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);
        props.fetchEvents();
        expect(dispatch).toHaveBeenCalled();
    })

    it('can get user data from the state', () => {
        expect(mapStateToProps(initialState)).toEqual({
            events: {}
        });
    })

    it('can handle cancel', () => {
        const wrapper = shallow(<Events {...props}/>)
        const inst = wrapper.instance();
        inst.handleCancel();
        expect(inst.state.createEvent).toBe(false);
    })

    it('can handle create Event', () => {
        const wrapper = shallow(<Events {...props}/>)
        const inst = wrapper.instance();
        inst.handleCreateEvent();
        expect(inst.state.createEvent).toBe(true);
    })

    it('can handle onChange', () => {
        const wrapper = shallow(<Events {...props}/>)
        const inst = wrapper.instance();
        const e = {
            target: {
                value: ''
            }
        }
        inst.handleOnChange(e);
        expect(inst.state.title).toBeTruthy;
    })

    it('can handle confirm', () => {
        const wrapper = shallow(<Events {...props}/>)
        const inst = wrapper.instance();
        inst.state = {
            title: "test Title",
            price: 213,
            date: "12112000",
            description: "test Description"
        }
        inst.handleConfirm();
        expect(inst.createEvent).toHaveBeenCalled;
    })

    it('can check for empty events submission', () => {
        const wrapper = shallow(<Events {...props}/>)
        const inst = wrapper.instance();
        inst.state = {
            title: "",
            price: 213,
            date: "",
            description: ""
        }
        inst.handleConfirm();
    })
})
