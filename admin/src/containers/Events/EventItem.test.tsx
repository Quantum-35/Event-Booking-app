import React from 'react';
import {shallow} from 'enzyme';

import {EventItem} from './EventItem';

describe('It can test Event Item', () => {
    const props = {
        title: 'test',
        description: 'test description',
        data: "test Date"
    }
    it('can render without crushing', () => {
        const wrapper = shallow(<EventItem {...props}/>);
        expect(wrapper.find('.events-list').exists()).toBe(true);
    })
})
