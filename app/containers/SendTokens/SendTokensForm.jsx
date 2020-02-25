import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { CURRENCIES, CURRENCIES_VALUES, WALLETS } from 'wallet-config';
import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import NumberInputField from 'components/FormFields/NumberInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { required, valueHasToBeLessThan } from 'components/FormFields/validate';

import {
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
} from './constants';

import CurrencyField from './CurrencyField';

/* eslint indent: 0 */
const SendTokensForm = ({
  handleSubmit,
  change,
  sendTokens,
  locale,
  sendTokensProcessing,
  loginData,
  account,
  currencyValue,
  walletValue,
}) => {
  function changeCurrency(value) {
    change(CURRENCY_FIELD, value);
    change(WALLET_FIELD, CURRENCIES[value.name].wallets[0]);
  }

  function changeWallet(value) {
    change(WALLET_FIELD, value);
  }

  const isPeer = walletValue && walletValue.name === WALLETS.PEERANHA.name;

  return (
    <div>
      <H4 className="text-center pb-3">
        <FormattedMessage {...commonMessages[account ? 'tip' : 'sendTokens']} />
      </H4>

      <form onSubmit={handleSubmit(sendTokens)}>
        <>
          <Field
            name={CURRENCY_FIELD}
            onChange={changeCurrency}
            disabled={sendTokensProcessing}
            label={translationMessages[locale][commonMessages.chooseCrypto.id]}
            component={CurrencyField}
            options={CURRENCIES_VALUES}
            validate={[required]}
            warn={[required]}
          />

          <Field
            name={WALLET_FIELD}
            onChange={changeWallet}
            disabled={sendTokensProcessing}
            label={translationMessages[locale][commonMessages.chooseWallet.id]}
            options={currencyValue ? currencyValue.wallets : null}
            component={CurrencyField}
            validate={[required]}
            warn={[required]}
          />
        </>

        <Field
          name={EOS_ACCOUNT_FIELD}
          disabled={sendTokensProcessing || Boolean(account)}
          label={translationMessages[locale][commonMessages.eosAccount.id]}
          component={TextInputField}
          validate={[required]}
          warn={[required]}
        />

        <Field
          name={AMOUNT_FIELD}
          disabled={sendTokensProcessing}
          label={translationMessages[locale][commonMessages.amount.id]}
          component={NumberInputField}
          validate={!isPeer ? [required] : [required, valueHasToBeLessThan]}
          warn={!isPeer ? [required] : [required, valueHasToBeLessThan]}
        />

        {isPeer && (
          <Field
            name={PASSWORD_FIELD}
            disabled={sendTokensProcessing}
            label={translationMessages[locale][commonMessages.password.id]}
            component={TextInputField}
            validate={required}
            warn={required}
            type="password"
          />
        )}

        <Button disabled={sendTokensProcessing} className="w-100 mb-3">
          <FormattedMessage {...commonMessages.submit} />
        </Button>
      </form>
    </div>
  );
};

SendTokensForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendTokens: PropTypes.func,
  locale: PropTypes.string,
  account: PropTypes.string,
  sendTokensProcessing: PropTypes.bool,
  loginData: PropTypes.object,
};

const formName = 'SendTokensForm';

let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendTokensForm);

FormClone = connect((state, props) => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    currencyValue: form.values ? form.values[CURRENCY_FIELD] : null,
    walletValue: form.values ? form.values[WALLET_FIELD] : null,
    enableReinitialize: true,
    initialValues: {
      [CURRENCY_FIELD]: CURRENCIES.PEER,
      [WALLET_FIELD]: CURRENCIES.PEER.wallets[0],
      [EOS_ACCOUNT_FIELD]: props.account,
    },
  };
})(FormClone);

export default React.memo(FormClone);
