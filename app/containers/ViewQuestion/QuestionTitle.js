import React from 'react';
import PropTypes from 'prop-types';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';

export const QuestionTitle = /* istanbul ignore next */ ({
  title,
  tags,
  communityId,
  communities,
}) =>
  title ? (
    <Base position="middle">
      <H3 className="mb-2">{title}</H3>

      <TagList
        className="my-1"
        chosenTags={tags}
        communityId={communityId}
        communities={communities}
      >
        <QuestionCommunity
          className="my-1"
          communities={communities}
          communityId={communityId}
        />
      </TagList>
    </Base>
  ) : null;

QuestionTitle.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  communityId: PropTypes.number,
  communities: PropTypes.array,
};

export default React.memo(QuestionTitle);
