/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import userIcon from 'svg/user';
import messages from 'common-messages';

import Icon from 'components/Icon';
import Button from 'components/Button';

const UserAuthNavLinks = ({
  showSignUpModal,
  showLoginModal,
  isMenuVisible,
}) => [
  <Button
    className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
    key="signUp"
    type="red"
    onClick={showSignUpModal}
  >
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.signUp} />
  </Button>,

  <Button
    className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
    key="login"
    type="red"
    onClick={showLoginModal}
  >
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.login} />
  </Button>,
];

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func,
  showLoginModal: PropTypes.func,
};

export default React.memo(UserAuthNavLinks);
