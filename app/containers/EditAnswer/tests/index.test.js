import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import EditAnswer from '../index';

const child = <div>children</div>;
React.Children.only = jest.fn().mockImplementation(() => child);

// const cmp = new EditAnswer();
const props = {
  match: {
    params: {
      questionid: 1,
      answerid: 1,
    },
  },
  locale: 'en',
  // answerLoading: false,
  editAnswerDispatch: jest.fn(),
  getAnswerDispatch: jest.fn(),
};

describe('EditAnswer', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*describe('componentDidMount', () => {
    cmp.componentDidMount();

    expect(cmp.props.getAnswerDispatch).toHaveBeenCalledWith(
      cmp.props.match.params.questionid,
      cmp.props.match.params.answerid,
    );
  });

  describe('editAnswer', () => {
    const values = new Map();
    cmp.editAnswer(values);

    expect(cmp.props.editAnswerDispatch).toHaveBeenCalledWith(
      values.get('TEXT_EDITOR_ANSWER_FORM'),
      cmp.props.match.params.questionid,
      cmp.props.match.params.answerid,
    );
  });*/

  describe('should render and match the snapshot', () => {
    it('answerLoading is true', () => {
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditAnswer {...props} answerLoading={true} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('answerLoading is false', () => {
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditAnswer {...props} answerLoading={false} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });
});
