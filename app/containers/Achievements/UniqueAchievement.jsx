import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import achievementReached from 'images/achievement_reached.svg?external';
import achievementNotReached from 'images/achievement_not_reached.svg?external';

import Icon from 'components/Icon';
import Span from 'components/Span';
import ProgressBar from './ProgressBar';

import messages from './messages';

const ImageBlock = styled.div`
  margin-right: 15px;
  text-align: center;
`;

const TitleBlock = styled(Span)`
  display: block;
`;

const DescriptionBlock = styled(TitleBlock)`
  margin-top: 15px;
`;

const Bage = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LimitPhrase = styled.p`
  margin-top: 10px;
  font-style: italic;
  color: #7b7b7b;
  font-size: 14px;
`;

const UniqueAchievement = ({
  reached,
  limit,
  totalAwarded,
  lowerValue,
  currentValue,
  isNext,
  pointsToNext,
  title,
  description,
  locale,
}) => {
  const availiableCount = limit - totalAwarded;

  const getProgress = () => (currentValue / lowerValue) * 100;

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <Bage>
      <ImageBlock>
        {reached && <Icon icon={achievementReached} width="80" height="74" />}
        {!reached && (
          <Icon icon={achievementNotReached} width="80" height="74" />
        )}
        {isNext && (
          <ProgressBar
            width="60%"
            progress={getProgress()}
            message={`${pointsToNext} ${
              translations[messages.progressBarPopover.ratingRelated.id]
            }`}
          />
        )}
      </ImageBlock>
      <div>
        <TitleBlock>
          <strong>{title}</strong>
        </TitleBlock>
        <DescriptionBlock>
          {description}
          {!reached && (
            <LimitPhrase>
              Available {availiableCount} out of {limit}
            </LimitPhrase>
          )}
        </DescriptionBlock>
      </div>
    </Bage>
  );
};

UniqueAchievement.propTypes = {
  reached: PropTypes.bool,
  title: PropTypes.string,
  limit: PropTypes.number,
  isNext: PropTypes.bool,
  lowerValue: PropTypes.number,
  currentValue: PropTypes.number,
  pointsToNext: PropTypes.number,
  totalAwarded: PropTypes.number,
  description: PropTypes.string,
  locale: PropTypes.string,
};

export default UniqueAchievement;
