import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import { EosioProvider } from '../index';

const child = <div>children</div>;
React.Children.only = jest.fn().mockImplementation(() => child);

// const cmp = new EosioProvider();
const props = {
  initializing: false,
  initEosio: jest.fn(),
};

describe('<EosioProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  describe('should render and match the snapshot', () => {
    it('initializing is false', () => {
      props.initializing = false;
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider {...props} />
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('initializing is true', () => {
      props.initializing = true;
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider {...props} />
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });

  /*it('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.initEosio).toHaveBeenCalled();
  });*/
});
