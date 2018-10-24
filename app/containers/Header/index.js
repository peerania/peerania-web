/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAccount,
  makeSelectUserIsInSystem,
} from 'containers/AccountProvider/selectors';
import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

import HeaderForm from './HeaderForm';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  render() {
    const {
      account,
      userIsInSystem,
      showSignUpModalDispatch,
      showLoginModalDispatch,
    } = this.props;

    const sendProps = {
      account,
      userIsInSystem,
      showLoginModalDispatch,
      showSignUpModalDispatch,
    };

    return <HeaderForm {...sendProps} />;
  }
}

Header.propTypes = {
  showSignUpModalDispatch: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
  userIsInSystem: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  userIsInSystem: makeSelectUserIsInSystem(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
