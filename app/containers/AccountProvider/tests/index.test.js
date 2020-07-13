import React from 'react';
import { render } from '@testing-library/react';
// import { mount } from 'enzyme';

import { AccountProvider } from '../index';

const props = {
  getCurrentAccountDispatch: jest.fn(),
};

describe('<AccountProvider />', () => {
  it('componentDidMount', async () => {
    await cmp.componentDidMount();
    expect(props.getCurrentAccountDispatch).toHaveBeenCalled();
  // it('componentDidMount', () => {
  //   AccountProvider.prototype.getCurrentAccountDispatch = jest.fn();
  //   const spy = jest.spyOn(
  //     AccountProvider.prototype,
  //     'getCurrentAccountDispatch',
  //   );
  //   const wrapper = mount(
  //     <AccountProvider {...props}>
  //       <div />
  //     </AccountProvider>,
  //   );
  //   wrapper.instance().getCurrentAccountDispatch();
  //   expect(spy).toHaveBeenCalled();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <AccountProvider {...props}>
        <div />
      </AccountProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
