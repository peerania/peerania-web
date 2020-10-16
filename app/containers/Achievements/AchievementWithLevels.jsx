import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import achievementBronze from 'images/achievement_bronze.svg?inline';
import achievementSilver from 'images/achievement_silver.svg?inline';
import achievementGold from 'images/achievement_gold.svg?inline';
import achievementNotReached from 'images/achievement_not_reached.svg?inline';

import Span from 'components/Span';

const Img = styled('img')`
  margin-right: 15px;
`;

const TitleBlock = styled(Span)`
  display: block;
`;

const DescriptionBlock = styled(TitleBlock)`
  margin-top: 15px;
`;

const Bage = styled.div`
  display: flex;
`;

const AchievementWithLevels = ({
  reached,
  value,
  levels,
  title,
  description,
  bronzeTitle,
  bronzeDescription,
  silverTitle,
  silverDescription,
  goldTitle,
  goldDescription,
}) => {
  const bronze = value >= levels.bronze && value < levels.silver;
  const silver = value >= levels.silver && value < levels.gold;
  const gold = value >= levels.gold;

  const zeroLevel = value < levels.bronze;

  return (
    <Bage>
      {(!reached || zeroLevel) && (
        <Img src={achievementNotReached} alt="not reached achievement" />
      )}
      {bronze && <Img src={achievementBronze} alt="bronze achievement" />}
      {silver && <Img src={achievementSilver} alt="silver achievement" />}
      {gold && <Img src={achievementGold} alt="gold achievement" />}
      <div>
        <TitleBlock>
          {(!reached || zeroLevel) && <strong>{title}</strong>}
          {bronze && <strong>{bronzeTitle}</strong>}
          {silver && <strong>{silverTitle}</strong>}
          {gold && <strong>{goldTitle}</strong>}
        </TitleBlock>
        {(!reached || zeroLevel) && (
          <DescriptionBlock>{description}</DescriptionBlock>
        )}
        {bronze && <DescriptionBlock>{bronzeDescription}</DescriptionBlock>}
        {silver && <DescriptionBlock>{silverDescription}</DescriptionBlock>}
        {gold && <DescriptionBlock>{goldDescription}</DescriptionBlock>}
      </div>
    </Bage>
  );
};

AchievementWithLevels.propTypes = {
  value: PropTypes.number,
  reached: PropTypes.bool,
  levels: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  bronzeTitle: PropTypes.string,
  bronzeDescription: PropTypes.string,
  silverTitle: PropTypes.string,
  silverDescription: PropTypes.string,
  goldTitle: PropTypes.string,
  goldDescription: PropTypes.string,
};

export default AchievementWithLevels;