import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';

import {
  TEXT_SECONDARY,
  BORDER_SUCCESS,
  TEXT_SUCCESS,
  BORDER_SECONDARY,
} from 'style-constants';

import { getTimeFromDateToNow } from 'utils/datetime';
import commonMessages from 'common-messages';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Span from 'components/Span';
import A from 'components/A';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';

import Banner from './Banner';

const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid
    ${x => (x.acceptedAnswer ? BORDER_SUCCESS : BORDER_SECONDARY)};

  color: ${x => (x.acceptedAnswer ? TEXT_SUCCESS : TEXT_SECONDARY)};
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin: 0 20px;
`;

const PostDate = Span.extend`
  white-space: nowrap;
`;

const PostTypeIcon = ({ postType, isMyAnswerAccepted, className }) => {
  if (postType === POST_TYPE_QUESTION) {
    return <img src={questionRoundedIcon} className={className} alt="icon" />;
  }

  if (isMyAnswerAccepted) {
    return <img src={bestAnswerIcon} className={className} alt="icon" />;
  }

  return <img src={answerIcon} className={className} alt="icon" />;
};

const Note = ({
  postType,
  isMyAnswerAccepted,
  acceptedAnswer,
  myPostRating,
  title,
  myPostTime,
  locale,
  id,
  answerId,
}) => (
  <li>
    <A
      className="d-flex align-items-center py-1"
      to={routes.questionView(
        id,
        postType === POST_TYPE_ANSWER ? answerId : null,
      )}
      href={routes.questionView(
        id,
        postType === POST_TYPE_ANSWER ? answerId : null,
      )}
    >
      <PostTypeIcon
        className="d-none d-sm-inline-block mr-0"
        postType={postType}
        isMyAnswerAccepted={isMyAnswerAccepted}
      />

      <Rating
        className="d-none d-sm-inline-block"
        acceptedAnswer={acceptedAnswer}
      >
        {myPostRating}
      </Rating>

      <Span className="flex-grow-1 mr-3" mobileFS="14">
        {title}
      </Span>

      <PostDate fontSize="14" color={TEXT_SECONDARY} mobileFS="12">
        {getTimeFromDateToNow(myPostTime, locale)}{' '}
        <FormattedMessage {...commonMessages.ago} />
      </PostDate>
    </A>
  </li>
);

const QuestionsProfileTab = ({ questions, className, loading, locale }) => (
  <div className={className}>
    <ul>
      {questions.map(x => (
        <Note
          {...x}
          key={`${x.id}_profile_tab_${x.postType}`}
          locale={locale}
        />
      ))}
    </ul>

    {!questions[0] && loading && <LoadingIndicator />}

    {!questions[0] && !loading && <Banner />}
  </div>
);

PostTypeIcon.propTypes = {
  postType: PropTypes.string,
  className: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
};

Note.propTypes = {
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
  acceptedAnswer: PropTypes.bool,
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  locale: PropTypes.string,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
