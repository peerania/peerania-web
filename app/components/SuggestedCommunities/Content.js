import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { gray } from 'style-constants';
import _ from 'lodash';

import arrowDownIcon from 'svg/arrowDown';

import InfinityLoader from 'components/InfinityLoader';
import P from 'components/P';
import Base from 'components/Base/BaseRounded';
import Span from 'components/Span';
import Icon from 'components/Icon';
import IconStyled from 'components/Icon/IconStyled';
import BaseTransparent from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';

import VoteUpButton from 'containers/VoteForNewCommunityButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewCommunityButton/VoteDownButton';

import messages from './messages';

const ItemStyled = Base.extend`
  margin-bottom: 15px;
  padding: 0;
  word-break: break-word;
`.withComponent('li');

const Header = BaseTransparent.extend`
  border-bottom: 1px solid ${gray};
  border-radius: 0;
`;

const Description = BaseTransparent.extend`
  ${P} {
    overflow: hidden;
    max-height: ${x => (!x.isOpened ? '100px' : 'auto')};
  }

  ${IconStyled} {
    transition: 0.5s;
    transform: rotate(${x => (x.isOpened ? '180deg' : '0deg')});
  }
`;

const Item = x => {
  const [isOpened, changeView] = useState(false);

  return (
    <ItemStyled key={x.id}>
      <Header className="d-flex justify-content-between">
        <div className="col-xl-8 d-flex align-items-center p-0">
          <MediumImageStyled
            className="mr-3"
            src={x.avatar}
            alt="voting-community"
          />
          <Span fontSize="24" bold>
            {x.name}
          </Span>
        </div>

        <div className="col-xl-4 d-flex justify-content-between p-0">
          <VoteUpButton id={`voteup_${x.id}`} communityId={x.id} />
          <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
        </div>
      </Header>

      <Description isOpened={isOpened}>
        <P className="mb-2" bold>
          <button onClick={() => changeView(!isOpened)}>
            <FormattedMessage {...messages.whyWeeNeedIt} />
            <Icon className="ml-2" icon={arrowDownIcon} noMargin />
          </button>
        </P>
        <P>{x.description}</P>
      </Description>
    </ItemStyled>
  );
};

const Content = ({
  suggestedCommunities,
  suggestedCommunitiesLoading,
  isLastFetch,
  getSuggestedCommunities,
}) => {
  if (!suggestedCommunities) return null;

  return (
    <InfinityLoader
      loadNextPaginatedData={getSuggestedCommunities}
      isLoading={suggestedCommunitiesLoading}
      isLastFetch={isLastFetch}
    >
      <ul>
        {_.orderBy(suggestedCommunities, y => y.upvotes, ['desc']).map(x => (
          <Item {...x} />
        ))}
      </ul>
    </InfinityLoader>
  );
};

Content.propTypes = {
  suggestedCommunities: PropTypes.array,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  getSuggestedCommunities: PropTypes.func,
};

export default React.memo(Content);