import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import DataCacheProvider from '../index';
import EosioProvider from 'containers/EosioProvider';

// const cmp = new DataCacheProvider();

const props = {
  getCommunitiesWithTagsDispatch: jest.fn(),
  getStatDispatch: jest.fn(),
  getFaqDispatch: jest.fn(),
  children: <div>Children</div>,
};

describe('<DataCacheProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*it('componentDidMount', () => {
    expect(cmp.props.getCommunitiesWithTagsDispatch).toHaveBeenCalledTimes(0);
    expect(cmp.props.getStatDispatch).toHaveBeenCalledTimes(0);
    expect(cmp.props.getFaqDispatch).toHaveBeenCalledTimes(0);

    cmp.componentDidMount();

    expect(cmp.props.getStatDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.getCommunitiesWithTagsDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.getFaqDispatch).toHaveBeenCalledTimes(1);
  });*/

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <DataCacheProvider {...props}>
            <div />
          </DataCacheProvider>
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
