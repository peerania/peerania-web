import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import createdHistory from 'createdHistory';
import configureStore from 'configureStore';

import EosioProvider from 'containers/EosioProvider';
import { Tags } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

// const cmp = new Tags();
let props = {};

beforeEach(() => {
  props = {
    locale: 'en',
    sorting: 'id',
    profile: {},
    showLoginModalDispatch: jest.fn(),
    getSuggestedTagsDispatch: jest.fn(),
    getExistingTagsDispatch: jest.fn(),
    Aside: null,
    Content: null,
    sortTags: jest.fn(),
    tagsNumber: 10,
    currentCommunity: {
      tags: [],
    },
    communities: [],
    communityId: 1,
  };
});

describe('<Tags />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*it('componentDidMount', () => {
    const {
      communityId,
      getSuggestedTagsDispatch,
      getExistingTagsDispatch,
    } = cmp.props;

    expect(getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    expect(getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.componentDidMount();

    expect(getExistingTagsDispatch).toHaveBeenCalledWith({ communityId });
    expect(getSuggestedTagsDispatch).toHaveBeenCalledWith({ communityId });
  });

  describe('componentDidUpdate', () => {
    it('communities.length is 0', () => {
      cmp.props.communities = [];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    });

    it('communities.length is 0', () => {
      cmp.props.communities = [{ id: 1 }];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
        communityId: cmp.props.communityId,
      });
    });
  });*/

  describe('should render and match the snapshot', () => {
    it('!currentCommunity.tags.length', () => {
      props.currentCommunity.tags = [];
      
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <Tags {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('currentCommunity.tags.length > 0', () => {
      props.currentCommunity.tags = Array(1).fill({});
      
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <Tags {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });
});
