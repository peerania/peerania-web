/**
 *
 * ShowOwnerKey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';

import Modal from 'components/ModalDialog';
import Button from 'components/Button/Contained/Transparent';
import FbVerificationCodeForm from 'components/FbVerificationCodeForm/index';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import SubmitEmailForm from './SubmitEmailForm';
import EmailForm from './EmailForm';

import {
  showOwnerKey,
  showOwnerKeyModal,
  hideOwnerKeyModal,
  sendEmail,
  removeOwnerKey,
  sendFbVerificationEmail,
  verifyFbAction,
} from './actions';

import { SUBMIT_EMAIL_FORM, EMAIL_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ShowOwnerKey extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      showOwnerKeyDispatch,
      hideOwnerKeyModalDispatch,
      children,
      showOwnerKeyModalDispatch,
      showModal,
      showOwnerKeyProcessing,
      locale,
      content,
      sendEmailProcessing,
      sendEmailDispatch,
      ownerKey,
      removeOwnerKeyDispatch,
      loginData,
      sendFbVerificationEmailDispatch,
      verifyFbActionDispatch,
    } = this.props;

    const { loginWithFacebook } = loginData;

    const showOwnerKeyOnClick = () => {
      if (loginWithFacebook) {
        sendFbVerificationEmailDispatch();
      } else {
        showOwnerKeyModalDispatch();
      }
    };

    return (
      <React.Fragment>
        {!loginWithFacebook && (
          <Modal show={showModal} closeModal={hideOwnerKeyModalDispatch}>
            {content === EMAIL_FORM && (
              <EmailForm
                locale={locale}
                sendEmail={sendEmailDispatch}
                sendEmailProcessing={sendEmailProcessing}
                loginData={loginData}
              />
            )}

            {content === SUBMIT_EMAIL_FORM && (
              <SubmitEmailForm
                locale={locale}
                showOwnerKey={showOwnerKeyDispatch}
                showOwnerKeyProcessing={showOwnerKeyProcessing}
              />
            )}
          </Modal>
        )}

        {loginWithFacebook && (
          <Modal show={showModal} closeModal={hideOwnerKeyModalDispatch}>
            <FbVerificationCodeForm
              locale={locale}
              verifyEmail={verifyFbActionDispatch}
              verifyEmailLoading={showOwnerKeyProcessing}
              sendAnotherCode={sendFbVerificationEmailDispatch}
            />
          </Modal>
        )}

        <Button
          onClick={!ownerKey ? showOwnerKeyOnClick : removeOwnerKeyDispatch}
        >
          {children}
        </Button>
      </React.Fragment>
    );
  }
}

ShowOwnerKey.propTypes = {
  showOwnerKeyDispatch: PropTypes.func,
  hideOwnerKeyModalDispatch: PropTypes.func,
  showOwnerKeyModalDispatch: PropTypes.func,
  children: PropTypes.any,
  showOwnerKeyProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  sendEmailProcessing: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  ownerKey: PropTypes.string,
  sendEmailDispatch: PropTypes.func,
  removeOwnerKeyDispatch: PropTypes.func,
  loginData: PropTypes.object,
  sendFbVerificationEmailDispatch: PropTypes.func,
  verifyFbActionDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  showOwnerKeyProcessing: selectors.selectShowOwnerKeyProcessing(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showOwnerKeyDispatch: bindActionCreators(showOwnerKey, dispatch),
    sendEmailDispatch: bindActionCreators(sendEmail, dispatch),
    showOwnerKeyModalDispatch: bindActionCreators(showOwnerKeyModal, dispatch),
    hideOwnerKeyModalDispatch: bindActionCreators(hideOwnerKeyModal, dispatch),
    removeOwnerKeyDispatch: bindActionCreators(removeOwnerKey, dispatch),
    sendFbVerificationEmailDispatch: bindActionCreators(
      sendFbVerificationEmail,
      dispatch,
    ),
    verifyFbActionDispatch: bindActionCreators(verifyFbAction, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showOwnerKey', reducer });
const withSaga = injectSaga({ key: 'showOwnerKey', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowOwnerKey);
