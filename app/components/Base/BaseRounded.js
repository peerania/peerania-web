import _get from 'lodash/get';

import { SECONDARY_SPECIAL_2 } from 'style-constants';

import { singleCommunityStyles } from 'utils/communityManagement';

import Base from './index';

const styles = singleCommunityStyles();

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) => (notRoundedStyle ? 'none' : _get(styles, 'buttonsBorderRadius', '5px'))};
  box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};
  transition: 0.5s;

  :hover {
    box-shadow: 0 5px 5px 0 ${SECONDARY_SPECIAL_2};
  }
`;

export default BaseRounded;
