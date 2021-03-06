import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { getBoostWeeks } from 'utils/walletManagement';

import NavHeader from 'components/WalletNavigation';
import SubHeader from 'containers/Wallet/SubHeader';
import Weeks from './Weeks';
import Form from './Form';

const View = ({
  userId,
  locale,
  account,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  weekStat,
  globalBoostStat,
  userBoostStat,
  getWeekStatProcessing,
  changeStakeDispatch,
  changeStakeLoading,
}) => {
  const boostWeeks = getBoostWeeks(weekStat, globalBoostStat, userBoostStat);
  const { nextWeek } = boostWeeks;
  const { userStake, maxStake } = nextWeek;

  const [currentStake, setCurrentStake] = useState(-1);

  if (currentStake < 0 && !!userStake) setCurrentStake(userStake);

  const changeCurrentStake = useCallback(
    x => {
      setCurrentStake(Math.floor(balance * x * 1000000) / 1000000);
    },
    [currentStake, setCurrentStake],
  );

  return (
    <>
      <NavHeader userId={userId} />

      <SubHeader
        account={account}
        balance={balance}
        stakedInCurrentPeriod={stakedInCurrentPeriod}
        stakedInNextPeriod={stakedInNextPeriod}
      />

      <Weeks
        locale={locale}
        weekStat={weekStat}
        globalBoostStat={globalBoostStat}
        userBoostStat={userBoostStat}
        getWeekStatProcessing={getWeekStatProcessing}
      />

      <Form
        valueHasToBeLessThan={balance}
        currentStake={currentStake}
        maxStake={balance}
        initialUserStake={stakedInNextPeriod || 0}
        changeCurrentStake={changeCurrentStake}
        onChangeCurrentStake={setCurrentStake}
        changeStake={changeStakeDispatch}
        changeStakeLoading={changeStakeLoading}
        locale={locale}
        nextWeekMaxStake={maxStake}
      />
    </>
  );
};

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
};

export default React.memo(View);
