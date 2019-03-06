import React  from 'react';
import { shallow } from 'enzyme';

import { Modal} from './Modal';

describe('Modal tests', () => {
  it('can render without crushing', () => {
      const wrapper = shallow(<Modal />);
      expect(wrapper.find('.modal').exists()).toBe(true);
  })
})
