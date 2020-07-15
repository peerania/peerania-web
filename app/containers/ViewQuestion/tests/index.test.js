import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import createdHistory from 'createdHistory';
import configureStore from 'configureStore';

import * as routes from 'routes-config';
import { scrollToSection } from 'utils/animation';

import EosioProvider from 'containers/EosioProvider';
import { ViewQuestion } from '../index';

jest.mock('components/TextEditor');

// const cmp = new ViewQuestion();
const setTimeout = jest.fn();
let props = {};

beforeEach(() => {
  props = {
    translations: {},
    account: 'user1',
    locale: 'en',
    questionDataLoading: true,
    postAnswerLoading: true,
    postCommentLoading: true,
    communities: [{ id: 0, tags: [{ name: 'tag1', id: 0 }] }],
    questionData: {
      community_id: 0,
      tags: [0],
      content: {
        title: 'title',
        content: 'content',
      },
    },
    match: {
      params: {
        id: 'id',
      },
    },
    history: {
      push: jest.fn(),
    },
    getQuestionDataDispatch: jest.fn(),
    postAnswerDispatch: jest.fn(),
    postCommentDispatch: jest.fn(),
    upVoteDispatch: jest.fn(),
    downVoteDispatch: jest.fn(),
    markAsAcceptedDispatch: jest.fn(),
    deleteQuestionDispatch: jest.fn(),
    deleteAnswerDispatch: jest.fn(),
    deleteCommentDispatch: jest.fn(),
    toggleCommentVisionDispatch: jest.fn(),
    saveCommentDispatch: jest.fn(),
    voteToDeleteDispatch: jest.fn(),
    resetStoreDispatch: jest.fn(),
  };

  setTimeout.mockClear();
});

jest.mock('utils/animation', () => ({
  scrollToSection: jest.fn(),
}));

Object.defineProperty(global, 'setTimeout', { value: setTimeout });

describe('<ViewQuestion />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*describe('componentWillReceiveProps', () => {
    it('scroll', () => {
      const nextProps = {
        questionData: {},
        questionDataLoading: false,
      };

      cmp.props.questionDataLoading = true;

      cmp.componentWillReceiveProps(nextProps);

      expect(setTimeout).toHaveBeenCalledWith(scrollToSection, 250);
    });

    it('redirect to not found page', () => {
      const nextProps = {
        questionData: null,
        questionDataLoading: false,
      };

      cmp.componentWillReceiveProps(nextProps);

      expect(cmp.props.history.push).toHaveBeenCalledWith(routes.notFound());
    });

    it('get question data', () => {
      const nextProps = {
        account: 'account',
      };

      cmp.props.account = 'account-22';
      cmp.questionId = 12;

      cmp.componentWillReceiveProps(nextProps);

      expect(cmp.props.getQuestionDataDispatch).toHaveBeenCalledWith(
        cmp.questionId,
      );
    });
  });

  describe('componentDidMount', () => {
    it('test', () => {
      cmp.componentDidMount();
      expect(cmp.questionId).toBe(cmp.props.match.params.id);
      expect(cmp.props.getQuestionDataDispatch).toHaveBeenCalledWith(
        cmp.questionId,
      );
    });
  });

  describe('componentWillMount', () => {
    it('test', () => {
      cmp.componentWillMount();
      expect(cmp.props.resetStoreDispatch).toHaveBeenCalled();
    });
  });*/

  describe('should render and match the snapshot', () => {
    it('!@questionDataLoading && @questionData', () => {
      props.questionDataLoading = false;

      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <ViewQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('!@questionDataLoading && !@questionData', () => {
      props.questionDataLoading = false;
      props.questionData = null;

      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <ViewQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('@questionDataLoading is true', () => {
      props.questionDataLoading = true;

      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <ViewQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });
});
