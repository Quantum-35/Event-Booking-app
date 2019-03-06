import React from 'react';
import {shallow} from 'enzyme';

import { Booking } from './Booking';

describe('it can test Booking', () => {
    it('can render without crushing', () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.find('.booking').exists()).toBe(true);
    })
})
