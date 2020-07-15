import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { Profile } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

// const cmp = new Profile();
const props = {
  children: null,
  userId: 'userId',
  profile: {
    profile: {},
  },
  locale: 'en',
  isProfileLoading: false,
  getUserProfileDispatch: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Profile', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <Profile {...props} />
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  /*it('componentDidMount', () => {
    const userId = 'user111';

    cmp.props.userId = userId;
    cmp.componentDidMount();
    expect(cmp.props.getUserProfileDispatch).toHaveBeenCalledWith(userId, true);
  });

  describe('componentWillReceiveProps', () => {
    it('nextProps.userId !== this.props.userId', () => {
      const nextProps = {
        userId: 'user2222',
      };

      cmp.props.userId = 'user1111';

      cmp.componentWillReceiveProps(nextProps);
      expect(cmp.props.getUserProfileDispatch).toHaveBeenCalledWith(
        nextProps.userId,
        true,
      );
    });
  });*/
});
