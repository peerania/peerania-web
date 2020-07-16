import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { Header } from '../Header';

// const children = <div>Children</div>;
// React.Children.only = jest.fn().mockImplementation(() => children);

describe('Header', () => {
  let store;

  const props = {
    goToCreateTagScreen: jest.fn(),
    sortTags: jest.fn(),
    sorting: 'id',
    currentCommunity: {},
    tagsNumber: 1,
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
          <Header {...props} />
        </EosioProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
