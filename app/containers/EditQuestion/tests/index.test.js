import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import { EditQuestion } from '../index';

const child = <div>children</div>;
React.Children.only = jest.fn().mockImplementation(() => child);

// const cmp = new EditQuestion();
const props = {
  match: {
    params: {
      questionid: 1,
      answerid: 1,
    },
  },
  locale: 'en',
  questionLoading: false,
  question: {
    title: 'title',
    content: 'content',
  },
  getAskedQuestionDispatch: jest.fn(),
  editQuestionDispatch: jest.fn(),
};

describe('EditQuestion', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*describe('componentDidMount', () => {
    cmp.componentDidMount();

    expect(cmp.props.getAskedQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.match.params.questionid,
    );
  });

  describe('editQuestion', () => {
    const values = new Map();
    cmp.editQuestion(values);

    expect(cmp.props.editQuestionDispatch).toHaveBeenCalledWith(
      {
        title: values.get('FORM_TITLE'),
        content: values.get('FORM_CONTENT'),
      },
      cmp.props.match.params.questionid,
    );
  });*/

  describe('should render and match the snapshot', () => {
    it('questionLoading is falsy', () => {
      props.questionLoading = false;
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('questionLoading is true', () => {
      props.questionLoading = true;
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('question is null', () => {
      props.question = null;
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });

    it('question is NOT null', () => {
      props.question = {
        title: 'title',
        content: 'content',
      };
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <EosioProvider>
            <EditQuestion {...props} />
          </EosioProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });
});
