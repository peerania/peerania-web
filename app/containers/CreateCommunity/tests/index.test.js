import React from 'react';
import { render } from '@testing-library/react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import CreateCommunity from '../index';
import EosioProvider from 'containers/EosioProvider';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  LANGUAGE_FIELD,
} from '../constants';

// const cmp = new CreateCommunity();
const props = {
  setDefaultStoreDispatch: jest.fn(),
  createCommunityDispatch: jest.fn(),
  locale: 'en',
};

const createCommunity = jest.fn();

describe('<CreateCommunity />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  it('componentWillUnmount', () => {
    // expect(cmp.props.setDefaultStoreDispatch).toHaveBeenCalledTimes(0);
    // cmp.componentWillUnmount();
    // expect(cmp.props.setDefaultStoreDispatch).toHaveBeenCalledTimes(1);
    expect(props.setDefaultStoreDispatch).toHaveBeenCalledTimes(0);
    expect(props.setDefaultStoreDispatch).toHaveBeenCalledTimes(1);
  });

  it('createCommunity', () => {
    const values = {
      [LANGUAGE_FIELD]: { value: 'en' },
      [COMM_NAME_FIELD]: COMM_NAME_FIELD,
      [COMM_SHORT_DESCRIPTION_FIELD]: COMM_SHORT_DESCRIPTION_FIELD,
      [COMM_MAIN_DESCRIPTION_FIELD]: COMM_MAIN_DESCRIPTION_FIELD,
      tags: {
        0: {
          [TAG_NAME_FIELD]: TAG_NAME_FIELD,
          [TAG_DESCRIPTION_FIELD]: TAG_DESCRIPTION_FIELD,
        },
      },
    };

    const obj0 = fromJS(values);
    const obj1 = jest.fn();
    const obj2 = {
      reset: jest.fn(),
    };

    const community = {
      // avatar: cmp.props.cachedImgHash,
      avatar: props.cachedImgHash,
      name: values[COMM_NAME_FIELD],
      language: values[LANGUAGE_FIELD].value,
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      tags: [{ name: TAG_NAME_FIELD, description: TAG_DESCRIPTION_FIELD }],
    };

    // cmp.createCommunity(obj0, obj1, obj2);
    // expect(cmp.props.createCommunityDispatch).toHaveBeenCalledWith(
    //   community,
    //   obj2.reset,
    // );
    createCommunity(obj0, obj1, obj2);
    expect(props.createCommunityDispatch).toHaveBeenCalledWith(
      community,
      obj2.reset,
    );
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <CreateCommunity {...props} />
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
