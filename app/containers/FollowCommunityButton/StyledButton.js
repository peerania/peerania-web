import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'images/okay.svg?inline';

import PrimaryButton from 'components/Button/Contained/PrimaryMedium';
import InfoButton from 'components/Button/Outlined/InfoMedium';

import Button from './index';
import messages from './messages';

const B = /* istanbul ignore next */ ({ isFollowed, onClick }) => {
  if (isFollowed) {
    return (
      <PrimaryButton data-isfollowed={isFollowed} onClick={onClick}>
        <img className="py-1" src={okayIcon} alt="icon" />
      </PrimaryButton>
    );
  }

  return (
    <InfoButton data-isfollowed={isFollowed} onClick={onClick}>
      <FormattedMessage {...messages.follow} />
    </InfoButton>
  );
};

export const StyledButton = /* istanbul ignore next */ ({
  communityIdFilter,
}) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick }) => (
      <B isFollowed={isFollowed} onClick={onClick} />
    )}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
  onClick: PropTypes.func,
};

StyledButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(StyledButton);
