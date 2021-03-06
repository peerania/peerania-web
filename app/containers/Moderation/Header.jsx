import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

import messages from './messages';

const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <span className="d-none d-md-inline-block">
        <FormattedMessage {...messages.title} />
      </span>

      <span className="d-inline-block d-md-none">
        <FormattedMessage {...commonMessages.moderationHeader} />
      </span>
    </H3>
  </Wrapper>
);

export default React.memo(Header);
