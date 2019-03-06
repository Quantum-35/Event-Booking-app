import React from 'react';
import { shallow } from 'enzyme';

import { About } from './About';

describe('Test About Component', () => {
    it('can render about page', ()=> {
        const wrapper = shallow(<About />);
        expect(wrapper.find('.about-page').exists()).toBe(true);
    })
});