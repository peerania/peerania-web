import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import commonMessages from 'common-messages';
import createCommunityIcon from 'images/createCommunity.svg?inline';

import Base from 'components/Base';
import NavigationButton from 'components/Button/Contained/Navigation';
import A from 'components/A';

import messages from './messages';
import languages from './languagesOptions';
import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';

const suggestedCommunitiesRoute = routes.suggestedCommunities();
const communitiesRoute = routes.communities();

const CommunitiesHeader = /* istanbul ignore next */ ({
  goToCreateCommunityScreen,
  SubHeader,
  changeSorting,
  sorting,
  communitiesNumber,
  setLang,
  language,
}) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <div>
      <Base
        className="d-flex align-items-center justify-content-between"
        position="top"
      >
        <div>
          <A to={communitiesRoute} href={communitiesRoute}>
            <NavigationButton isLink={path !== communitiesRoute}>
              <FormattedMessage {...commonMessages.communities} />
            </NavigationButton>
          </A>

          <A to={suggestedCommunitiesRoute} href={suggestedCommunitiesRoute}>
            <NavigationButton isLink={path !== suggestedCommunitiesRoute}>
              <FormattedMessage {...messages.voting} />
            </NavigationButton>
          </A>
        </div>

        <div>
          <NavigationButton
            id={`${GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID}_header`}
            onClick={goToCreateCommunityScreen}
            className="d-inline-flex align-items-center px-0"
            isLink
          >
            <img className="mr-2" src={createCommunityIcon} alt="icon" />
            <FormattedMessage {...messages.suggestCommunity} />
          </NavigationButton>
        </div>
      </Base>

      <Base position="bottom">
        <SubHeader
          changeSorting={changeSorting}
          sorting={sorting}
          communitiesNumber={communitiesNumber}
          setLang={setLang}
          language={language}
          languages={languages}
        />
      </Base>
    </div>
  );
};

CommunitiesHeader.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
  SubHeader: PropTypes.any,
  changeSorting: PropTypes.func,
  sorting: PropTypes.object,
  communitiesNumber: PropTypes.number,
  setLang: PropTypes.func,
  language: PropTypes.object,
};

export default CommunitiesHeader;
