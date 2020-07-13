import React from 'react';
import { fromJS } from 'immutable';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { EditProfilePage } from '../index';

// const cmp = new EditProfilePage();

const props = {
  saveProfileDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
  profile: {
    profile: {
      a: 11,
      c: 14,
    },
  },
  match: {
    params: {
      id: null,
    },
  },
  account: 'user1',
  isProfileSaving: false,
  questions: [],
  questionsWithUserAnswers: [],
};

describe('<EditProfilePage>', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(cmp.props.setDefaultReducerDispatch).toHaveBeenCalled();
    });
  });

  describe('saveProfile', () => {
    const values = fromJS({ a: 12, b: 12 });
    const profile = {
      ...cmp.props.profile.profile,
      ...values.toJS(),
    };

    it('test', () => {
      cmp.saveProfile(values);
      expect(cmp.props.saveProfileDispatch).toHaveBeenCalledWith({
        profile,
        userKey: cmp.props.match.params.id,
      });
    });
  });*/

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <EditProfilePage {...props} />
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
