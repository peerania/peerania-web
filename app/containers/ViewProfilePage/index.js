/**
 *
 * ViewProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';

import Profile from 'containers/Profile';
import UserNavigation from 'components/UserNavigation';

import QuestionsOfUser from 'containers/QuestionsOfUser';
import QuestionsWithAnswersOfUser from 'containers/QuestionsWithAnswersOfUser';

import * as selectorsProfile from 'containers/Profile/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectQuestionsLoading,
  selectQuestions,
} from 'containers/QuestionsOfUser/selectors';

import {
  selectQuestionsLoading as selectQuestionsWithAnswersLoading,
  selectQuestionsWithUserAnswers,
} from 'containers/QuestionsWithAnswersOfUser/selectors';

import ProfileViewForm from './ProfileViewForm';

const ViewProfilePage = /* istanbul ignore next */ ({
  match,
  profile,
  account,
  communities,
  questions,
  questionsWithUserAnswers,
  questionsLoading,
  questionsWithAnswersLoading,
  locale,
}) => {
  const path = window.location.pathname + window.location.hash;
  const userId = match.params.id;

  // TODO: remove hardcoded questions&answers length after finishing task
  return (
    <Profile userId={userId}>
      <UserNavigation
        userId={userId}
        account={account}
        questionsLength={profile ? profile.questions_asked || 1 : 0}
        questionsWithUserAnswersLength={
          profile ? profile.answers_given || 1 : 0
        }
      />

      <QuestionsOfUser
        className={path === routes.user_questions(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.user_questions(userId)}
        userId={userId}
      />

      <QuestionsWithAnswersOfUser
        className={path === routes.user_answers(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.user_answers(userId)}
        userId={userId}
      />

      <ProfileViewForm
        className={
          path === routes.profile_view(userId) ||
          path === routes.profile_view_activity_questions(userId) ||
          path === routes.profile_view_activity_answers(userId)
            ? ''
            : 'd-none'
        }
        userId={userId}
        profile={profile}
        account={account}
        communities={communities}
        questions={questions}
        questionsWithUserAnswers={questionsWithUserAnswers}
        questionsLoading={questionsLoading}
        questionsWithAnswersLoading={questionsWithAnswersLoading}
        locale={locale}
      />
    </Profile>
  );
};

ViewProfilePage.propTypes = {
  profile: PropTypes.object,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  communities: PropTypes.array,
  questions: PropTypes.array,
  questionsWithUserAnswers: PropTypes.array,
  questionsLoading: PropTypes.bool,
  questionsWithAnswersLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  profile: selectorsProfile.selectProfile(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  questions: selectQuestions(),
  questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
  questionsLoading: selectQuestionsLoading(),
  questionsWithAnswersLoading: selectQuestionsWithAnswersLoading(),
});

export default connect(
  mapStateToProps,
  null,
)(ViewProfilePage);
