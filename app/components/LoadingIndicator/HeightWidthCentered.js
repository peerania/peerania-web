import React from 'react';
import styled from 'styled-components';

import { singleCommunityColors } from 'utils/communityManagement';

import LoadingIndicator from './index';

const colors = singleCommunityColors();

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.mainBackground || ''};
`;

const HeightWidthCentered = () => (
  <Wrapper>
    <LoadingIndicator />
  </Wrapper>
);

export default React.memo(HeightWidthCentered);
