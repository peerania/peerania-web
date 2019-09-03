/**
 *
 * CreateCommunity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import {
  WHAT_IS_COMMUNITY_QUESTION,
  WHO_MANAGES_COMMUNITY_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  uploadImageFileAction,
  saveImageChanges,
  clearImageChanges,
  createCommunity,
  setDefaultStore,
} from './actions';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  LANGUAGE_FIELD,
  TAG_DESCRIPTION_FIELD,
} from './constants';

import Form from './Form';
import Header from './Header';
import Tips from './Tips';
import CommunityIsSuggestedBanner from './CommunityIsSuggestedBanner';

const createCommunityRoute = routes.communitiesCreate();

/* eslint-disable react/prefer-stateless-function */
export class CreateCommunity extends React.PureComponent {
  componentWillUnmount() {
    this.props.setDefaultStoreDispatch();
  }

  createCommunity = (...args) => {
    const { reset } = args[2];
    const values = args[0].toJS();

    const tags = Object.keys(values.tags)
      .filter(x => values.tags[x])
      .map(x => ({
        name: values.tags[x][TAG_NAME_FIELD],
        description: values.tags[x][TAG_DESCRIPTION_FIELD],
      }));

    const community = {
      avatar: this.props.cachedImgHash,
      name: values[COMM_NAME_FIELD],
      language: values[LANGUAGE_FIELD].value,
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      tags,
    };

    this.props.createCommunityDispatch(community, reset);
  };

  uploadImage = event => {
    uploadImage(event, this.props.uploadImageFileDispatch);
  };

  getCroppedAvatar = obj => {
    getCroppedAvatar(obj, this.props.saveImageChangesDispatch);
  };

  render() /* istanbul ignore next */ {
    const sendProps = {
      createCommunity: this.createCommunity,
      uploadImage: this.uploadImage,
      getCroppedAvatar: this.getCroppedAvatar,
      clearImageChanges: this.props.clearImageChangesDispatch,
      editingImgState: this.props.editingImgState,
      cachedProfileImg: this.props.cachedProfileImg,
      createCommunityLoading: this.props.createCommunityLoading,
      translations: translationMessages[this.props.locale],
    };

    const path = window.location.pathname + window.location.hash;

    return (
      <div>
        <Seo
          title={sendProps.translations[messages.title.id]}
          description={sendProps.translations[messages.description.id]}
          language={this.props.locale}
          index={false}
        />

        <Header />

        {path === createCommunityRoute && (
          <Base className="p-0">
            <div className="d-flex">
              <div className="col-12 col-xl-9 p-0">
                <BaseTransparent>
                  <Form {...sendProps} />
                </BaseTransparent>
              </div>

              <div className="col-12 col-xl-3 p-0">
                <Tips faqQuestions={this.props.faqQuestions} />
              </div>
            </div>
          </Base>
        )}

        {path !== createCommunityRoute && <CommunityIsSuggestedBanner />}
      </div>
    );
  }
}

CreateCommunity.propTypes = {
  setDefaultStoreDispatch: PropTypes.func.isRequired,
  createCommunityDispatch: PropTypes.func.isRequired,
  clearImageChangesDispatch: PropTypes.func.isRequired,
  saveImageChangesDispatch: PropTypes.func.isRequired,
  uploadImageFileDispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  editingImgState: PropTypes.bool.isRequired,
  createCommunityLoading: PropTypes.bool.isRequired,
  cachedProfileImg: PropTypes.string.isRequired,
  cachedImgHash: PropTypes.string.isRequired,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_COMMUNITY_QUESTION,
    WHO_MANAGES_COMMUNITY_QUESTION,
  ]),
  editingImgState: selectors.selectEditingImgState(),
  cachedProfileImg: selectors.selectCachedProfileImg(),
  createCommunityLoading: selectors.selectCreateCommunityLoading(),
  cachedImgHash: selectors.selectCachedImgHash(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    uploadImageFileDispatch: res => dispatch(uploadImageFileAction(res)),
    saveImageChangesDispatch: res => dispatch(saveImageChanges(res)),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    createCommunityDispatch: (comm, reset) =>
      dispatch(createCommunity(comm, reset)),
    setDefaultStoreDispatch: () => dispatch(setDefaultStore()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createCommunity', reducer });
const withSaga = injectSaga({ key: 'createCommunity', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateCommunity);
