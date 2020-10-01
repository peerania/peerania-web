import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { tags } from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { isModerator } from 'utils/profileManagement';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectFaqQuestions,
} from 'containers/DataCacheProvider/selectors';

import {
  selectUserRating,
  selectUserEnergy,
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  WHAT_IS_TAG_QUESTION,
  HOW_TO_USE_IT_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { suggestTag } from './actions';

import {
  NAME_FIELD,
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  MIN_RATING_TO_CREATE_TAG,
  MIN_ENERGY_TO_CREATE_TAG,
} from './constants';

import Form from './Form';
import Tips from './Tips';
import Header from './Header';

const single = isSingleCommunityWebsite();

const CreateTag = ({
  locale,
  createTagLoading,
  communities,
  match,
  faqQuestions,
  suggestTagDispatch,
  account,
  userRating,
  userEnergy,
  profileInfo,
}) => {
  const commId = useMemo(() => single || +match.params.communityid, [match]);

  const createTag = useCallback(
    (...args) => {
      const values = args[0].toJS();

      suggestTagDispatch(
        {
          name: values[NAME_FIELD],
          description: values[DESCRIPTION_FIELD],
          communityId: +values[FORM_COMMUNITY].id,
        },
        args[2].reset,
      );
    },
    [suggestTagDispatch],
  );
  console.log(profileInfo);
  if (
    (!account ||
      userRating < MIN_RATING_TO_CREATE_TAG ||
      userEnergy < MIN_ENERGY_TO_CREATE_TAG) &&
    !isModerator(profileInfo)
  )
    return <Redirect to={tags()} />;
  console.log(communities);
  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <Header />

      {communities[0] && (
        <TipsBase>
          <BaseSpecialOne>
            <Form
              communityId={commId}
              communities={communities}
              createTagLoading={createTagLoading}
              createTag={createTag}
              translations={translationMessages[locale]}
            />
          </BaseSpecialOne>

          <Tips faqQuestions={faqQuestions} />
        </TipsBase>
      )}

      {!communities.length && <LoadingIndicator />}
    </div>
  );
};

/*
export class CreateTag extends React.PureComponent {


  render() {
}
*/
CreateTag.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  createTagLoading: PropTypes.bool,
  suggestTagDispatch: PropTypes.func,
  communities: PropTypes.array,
  faqQuestions: PropTypes.array,
  account: PropTypes.string,
  userRating: PropTypes.number,
  userEnergy: PropTypes.number,
  profileInfo: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'createTag', reducer }),
  injectSaga({ key: 'createTag', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      faqQuestions: selectFaqQuestions([
        WHAT_IS_TAG_QUESTION,
        HOW_TO_USE_IT_QUESTION,
      ]),
      communities: selectCommunities(),
      createTagLoading: selectors.selectSuggestTagLoading(),
      account: makeSelectAccount(),
      userRating: selectUserRating(),
      userEnergy: selectUserEnergy(),
      profileInfo: makeSelectProfileInfo(),
    }),
    dispatch => ({
      suggestTagDispatch: bindActionCreators(suggestTag, dispatch),
    }),
  ),
)(CreateTag);
