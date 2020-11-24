import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import QuestionForm from 'components/QuestionForm';
import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from 'components/QuestionForm/constants';

import * as makeSelectEditQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getAskedQuestion, editQuestion } from './actions';
import { EDIT_QUESTION_FORM, EDIT_QUESTION_BUTTON } from './constants';
import { FORM_TYPE } from '../../components/QuestionForm/constants';

const EditQuestion = ({
  match: {
    params: { questionid },
  },
  locale,
  question,
  questionLoading,
  editQuestionLoading,
  communities,
  editQuestionDispatch,
  getAskedQuestionDispatch,
}) => {
  useEffect(
    () => {
      getAskedQuestionDispatch(questionid);
    },
    [questionid, getAskedQuestionDispatch],
  );

  const sendQuestion = useCallback(
    values => {
      const val = values.toJS();

      editQuestionDispatch(
        {
          title: val[FORM_TITLE],
          content: val[FORM_CONTENT],
          community: val[FORM_COMMUNITY],
          chosenTags: val[FORM_TAGS],
          type: val[FORM_TYPE],
        },
        questionid,
      );
    },
    [questionid],
  );

  const sendProps = useMemo(
    () => ({
      form: EDIT_QUESTION_FORM,
      formTitle: translationMessages[locale][messages.title.id],
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName:
        translationMessages[locale][messages.submitButtonName.id],
      sendQuestion,
      questionLoading: editQuestionLoading,
      communities,
      question,
      questionid,
      locale,
    }),
    [questionid, question, communities, editQuestionLoading, sendQuestion],
  );

  const [helmetTitle, helmetDescription] = useMemo(
    () => [
      question?.title ?? translationMessages[locale][messages.title.id],
      question?.content ??
        translationMessages[locale][messages.title.description],
    ],
    [question],
  );

  return (
    <div>
      <Seo
        title={helmetTitle}
        description={helmetDescription}
        language={locale}
        index={false}
      />

      {!questionLoading && <QuestionForm {...sendProps} />}

      {questionLoading && <LoadingIndicator />}
    </div>
  );
};

EditQuestion.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  question: PropTypes.object,
  communities: PropTypes.array,
  getAskedQuestionDispatch: PropTypes.func,
  editQuestionDispatch: PropTypes.func,
  questionLoading: PropTypes.bool,
  editQuestionLoading: PropTypes.bool,
};

export default compose(
  injectReducer({ key: 'editQuestion', reducer }),
  injectSaga({ key: 'editQuestion', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      account: makeSelectAccount(),
      communities: selectCommunities(),
      question: makeSelectEditQuestion.selectQuestion(),
      questionLoading: makeSelectEditQuestion.selectQuestionLoading(),
      editQuestionLoading: makeSelectEditQuestion.selectEditQuestionLoading(),
    }),
    dispatch => ({
      getAskedQuestionDispatch: bindActionCreators(getAskedQuestion, dispatch),
      editQuestionDispatch: bindActionCreators(editQuestion, dispatch),
    }),
  ),
)(EditQuestion);
