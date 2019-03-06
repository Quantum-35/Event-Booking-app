import React  from 'react';
import { shallow } from 'enzyme';

import { Backdrop} from './Backdrop';

describe('Backdrop tests', () => {
  it('can render without crushing', () => {
      const wrapper = shallow(<Backdrop />);
      expect(wrapper.find('.backdrop').exists()).toBe(true);
  })
})
