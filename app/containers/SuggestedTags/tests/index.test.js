import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import createdHistory from 'createdHistory';
import configureStore from 'configureStore';

import EosioProvider from 'containers/EosioProvider';
import { SuggestedTags } from '../index';

// const cmp = new SuggestedTags();
let props = {};
const ev = {
  currentTarget: {
    dataset: {
      key: 'key',
    },
  },
};

beforeEach(() => {
  props = {
    locale: 'en',
    communities: [{ id: 1, tags: [] }, { id: 2, tags: [] }],
    isLastFetch: false,
    suggestedTagsLoading: false,
    existingTags: [{ id: 1 }, { id: 2 }],
    match: { params: { communityid: 1 } },
    emptyCommunity: { tags: [] },
    getSuggestedTagsDispatch: jest.fn(),
  };
});

describe('SuggestedTags', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*it('sortTags', () => {
    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.sortTags(ev);

    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledWith({
      sorting: ev.currentTarget.dataset.key,
      communityId: cmp.currentCommunity.id,
    });
  });

  it('loadMoreTags', () => {
    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.loadMoreTags();

    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledWith({
      loadMore: true,
      communityId: cmp.currentCommunity.id,
    });
  });*/

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <SuggestedTags {...props} />
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
