import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { QuestionsOfUser } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

// const cmp = new QuestionsOfUser();

const props = {
  isLastFetch: false,
  questionsLoading: false,
  userId: 'userId',
  locale: 'en',
  questions: [],
  className: 'className',
  infinityOff: false,
  communities: [],
  getQuestionsDispatch: jest.fn(),
  resetStoreDispatch: jest.fn(),
};

describe('QuestionsOfUser', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*describe('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
      cmp.props.userId,
    );
  });

  describe('componentWillUnmount', () => {
    cmp.componentWillUnmount();
    expect(cmp.props.resetStoreDispatch).toHaveBeenCalled();
  });

  describe('fetchQuestions', () => {
    cmp.fetchQuestions();
    expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
      cmp.props.userId,
    );
  });*/

  describe('should render and match the snapshot', () => {
    it('questionsLoading TRUE', () => {
      props.questionsLoading = true;

      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <QuestionsOfUser {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('questions[0] TRUE', () => {
      props.questions = [
        {
          myPostRating: 100,
          title: 'title',
          myPostTime: 1550837750334,
          answers: [],
          locale: 'en',
          acceptedAnswer: false,
          communities: [],
          id: 'id',
          community_id: 123,
        },
      ];

      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <QuestionsOfUser {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });
});
