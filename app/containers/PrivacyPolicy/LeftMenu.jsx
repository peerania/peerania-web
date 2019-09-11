import React from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import { getQuestionCode, getSectionCode } from 'utils/privacyPolicyManagement';

import {
  BORDER_PRIMARY_DARK,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BG_PRIMARY_DARK,
} from 'style-constants';

import { BasicLink, ViewStyled } from 'containers/LeftMenu/View';

import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';

import A from 'components/A';

const A1 = A.extend`
  ${BasicLink};

  ${({ route }) =>
    (window.location.pathname + window.location.hash).match(route)
      ? `
    background-color: ${BG_PRIMARY_DARK}25;
    border-color: ${BORDER_PRIMARY_DARK};
    font-weight: bold;
  `
      : `
    background-color: ${BG_TRANSPARENT};
    border-color: ${BORDER_TRANSPARENT};
    font-weight: normal;
  `};
`.withComponent(A);

const LeftMenu = ({ isMenuVisible, privacyPolicy }) => (
  <ViewStyled id={LEFT_MENU_ID} isMenuVisible={isMenuVisible}>
    <div>
      {privacyPolicy &&
        privacyPolicy.blocks.map((x, sectionIndex) => (
          <A1
            to={routes.privacyPolicy(getQuestionCode(sectionIndex))}
            route={routes.privacyPolicy(getSectionCode(sectionIndex))}
          >
            {x.h2}
          </A1>
        ))}
    </div>
  </ViewStyled>
);

LeftMenu.propTypes = {
  isMenuVisible: PropTypes.bool,
  privacyPolicy: PropTypes.array,
};

export default LeftMenu;
