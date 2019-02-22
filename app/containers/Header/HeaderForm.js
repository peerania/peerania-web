/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { pink } from 'style-constants';
import createdHistory from 'createdHistory';

import Input from 'components/Input';
import RoundedButton from 'components/Button/RoundedButton';
import LargeButton from 'components/Button/LargeButton';
import Icon from 'components/Icon';

import * as routes from 'routes-config';
import messages from 'common-messages';

import addIcon from 'svg/add';
import searchIcon from 'svg/search';
import closeIcon from 'svg/close';
import headerNavigationIcon from 'svg/headerNavigation';
import img from 'images/LogoBlack.svg';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import UserAuthNavLinks from './UserAuthNavLinks';
import UserProfileNav from './UserProfileNav';
import { HEADER_ID } from './constants';

const RoundedButtonStyled = RoundedButton.extend`
  background: ${pink};
`;

export const LoginProfile = React.memo(
  ({
    profileInfo,
    showSignUpModalDispatch,
    showLoginModalDispatch,
    isMenuVisible,
    expandLeftMenuNavigation,
  }) /* istanbul ignore next */ => {
    if (profileInfo) {
      return (
        <UserProfileNav
          isMenuVisible={isMenuVisible}
          profileInfo={profileInfo}
          expandLeftMenuNavigation={expandLeftMenuNavigation}
        />
      );
    }

    return (
      <UserAuthNavLinks
        isMenuVisible={isMenuVisible}
        showSignUpModal={showSignUpModalDispatch}
        showLoginModal={showLoginModalDispatch}
      />
    );
  },
);

const homeRoute = routes.home();
const addQuestionRoute = /* istanbul ignore next */ () => {
  createdHistory.push(routes.question_ask());
};

const HeaderForm = /* istanbul ignore next */ props => (
  <Wrapper id={HEADER_ID}>
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        {!props.isMenuVisible && (
          <Logo className="d-flex align-items-center">
            <Icon
              onClick={props.showMenu}
              className="mr-3 d-flex d-md-none"
              icon={!props.isMenuVisible ? headerNavigationIcon : closeIcon}
              noMargin
            />

            <Link to={homeRoute} href={homeRoute}>
              <img src={img} alt="logo" />
            </Link>
          </Logo>
        )}

        <Section isMenuVisible={props.isMenuVisible}>
          {!props.isMenuVisible && [
            <Input
              key="1"
              className="d-none d-lg-flex"
              type="text"
              placeholder={props.intl.formatMessage({ id: messages.search.id })}
              isSearchable
            />,

            <RoundedButton
              key="RoundedButton2"
              className="d-flex justify-content-center align-items-center d-lg-none"
              onClick={addQuestionRoute}
            >
              <Icon icon={searchIcon} noMargin />
            </RoundedButton>,

            <LargeButton
              key="Button3"
              className="d-none d-lg-flex"
              disabled={!props.profileInfo}
              onClick={addQuestionRoute}
            >
              <Icon icon={addIcon} />
              <FormattedMessage {...messages.addQuestion} />
            </LargeButton>,

            <RoundedButtonStyled
              key="RoundedButton4"
              className="d-flex justify-content-center align-items-center d-lg-none"
              disabled={!props.profileInfo}
              onClick={addQuestionRoute}
            >
              <Icon icon={addIcon} noMargin />
            </RoundedButtonStyled>,
          ]}

          <LoginProfile {...props} />
        </Section>
      </div>
    </div>
  </Wrapper>
);

HeaderForm.propTypes = {
  intl: intlShape.isRequired,
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showMenu: PropTypes.func,
};

LoginProfile.propTypes = {
  profileInfo: PropTypes.object,
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
};

export default injectIntl(React.memo(HeaderForm));
