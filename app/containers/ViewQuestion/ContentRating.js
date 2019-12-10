import React from 'react';
import PropTypes from 'prop-types';

import fingerUpSingleQuestionPage from 'images/fingerUpSingleQuestionPage.svg?inline';
import greenFingerUpSingleQuestion from 'images/greenFingerUpSingleQuestion.svg?inline';
import fingerDownSingleQuestionPage from 'images/fingerDownSingleQuestionPage.svg?inline';
import redFingerDownSingleQuestion from 'images/redFingerDownSingleQuestion.svg?inline';
import disabledFingerUp from 'images/disabledFingerUp.svg?inline';
import disabledFingerDown from 'images/disabledFingerDown.svg?inline';
import emptyFingerUp from 'images/emptyFingerUp.svg?inline';
import emptyFingerDown from 'images/emptyFingerDown.svg?inline';

import { BORDER_SUCCESS, BORDER_WARNING_LIGHT } from 'style-constants';
import { getFormattedNum } from 'utils/numbers';

import Base from 'components/Base';
import Span from 'components/Span';
import MediumImage from 'components/Img/MediumImage';

import { UP_VOTE_BUTTON, DOWN_VOTE_BUTTON } from './constants';

const MediumImageStyled = MediumImage.extend`
  ${/* istanbul ignore next */ props =>
    props.src === greenFingerUpSingleQuestion
      ? `border: 1px solid ${BORDER_SUCCESS};`
      : ``};

  ${/* istanbul ignore next */ props =>
    props.src === redFingerDownSingleQuestion
      ? `border: 1px solid ${BORDER_WARNING_LIGHT};`
      : ``};
`;

const ContentRating = /* istanbul ignore next */ ({
  answerId,
  account,
  upVote,
  votingStatus,
  rating,
  downVote,
  userInfo,
}) => (
  <Base className="d-flex align-items-center justify-content-between">
    <button
      className="p-0"
      onClick={upVote}
      id={`${UP_VOTE_BUTTON}${answerId}`}
      data-answerid={answerId}
      data-whowasupvoted={userInfo.user}
    >
      <UpvoteIcon
        account={account}
        userInfo={userInfo}
        votingStatus={votingStatus}
      />
    </button>

    <Span fontSize="20" bold>
      {getFormattedNum(rating)}
    </Span>

    <button
      className="p-0"
      onClick={downVote}
      id={`${DOWN_VOTE_BUTTON}${answerId}`}
      data-answerid={answerId}
      data-whowasdownvoted={userInfo.user}
    >
      <DownvoteIcon
        account={account}
        userInfo={userInfo}
        votingStatus={votingStatus}
      />
    </button>
  </Base>
);

ContentRating.propTypes = {
  rating: PropTypes.number,
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function UpvoteIcon({
  account,
  userInfo,
  votingStatus,
}) /* istanbul ignore next */ {
  let src = null;

  if (account === userInfo.user) {
    src = disabledFingerUp;
  } else if (votingStatus.isUpVoted) {
    src = greenFingerUpSingleQuestion;
  } else if (votingStatus.isDownVoted) {
    src = emptyFingerUp;
  } else {
    src = fingerUpSingleQuestionPage;
  }

  return <MediumImageStyled src={src} alt="voteup" />;
}

UpvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
};

function DownvoteIcon({
  account,
  userInfo,
  votingStatus,
}) /* istanbul ignore next */ {
  let src = null;

  if (account === userInfo.user) {
    src = disabledFingerDown;
  } else if (votingStatus.isDownVoted) {
    src = redFingerDownSingleQuestion;
  } else if (votingStatus.isUpVoted) {
    src = emptyFingerDown;
  } else {
    src = fingerDownSingleQuestionPage;
  }

  return <MediumImageStyled src={src} alt="votedown" />;
}

DownvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
};

export { UpvoteIcon, DownvoteIcon, ContentRating };
export default React.memo(ContentRating);