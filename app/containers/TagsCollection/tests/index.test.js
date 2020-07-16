import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { TagsCollection } from '../index';

describe('<TagsCollection />', () => {
  let store;

  const props = {
    locale: 'en',
    profile: {},
    communities: [{ id: 1, tags: [] }],
    communitiesLoading: false,
    showLoginModalDispatch: jest.fn(),
  };

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  it('renders and matches the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <TagsCollection {...props} />
        </EosioProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
