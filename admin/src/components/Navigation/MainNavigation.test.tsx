import React  from 'react';
import { mount, shallow } from 'enzyme';
import 'jest-localstorage-mock'

import { MainNavigation} from './MainNavigation';

describe('Modal tests', () => {
  it('can render without crushing', () => {
      const wrapper = shallow(<MainNavigation />);
      expect(wrapper.find('.main-navigation').exists()).toBe(true);
  })
  it('can click logout button', () => {
      localStorage.setItem('access_token', 'test');
      const wrapper = shallow(<MainNavigation />);
      const spy = jest.spyOn(wrapper.instance(), 'handleLogout');
      wrapper.instance().forceUpdate();
      const logout = wrapper.find('.logout-btn');
    //   console.log(wrapper.debug());
      logout.simulate('click');
      expect(spy).toHaveBeenCalled();
  })
  it('can click logout button', async () => {
    const wrapper = shallow(<MainNavigation />);
    const inst = wrapper.instance();
    await inst.handleLogout();
    expect(localStorage.removeItem).toBeCalled()
  })
})
