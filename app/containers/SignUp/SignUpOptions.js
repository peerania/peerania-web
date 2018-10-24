import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const SignUpOptions = props => (
  <div>
    <button
      className="btn btn-secondary w-100 py-3 mb-4"
      onClick={props.continueSignUp}
    >
      <FormattedMessage {...messages.signUpWith} />
    </button>
    <p className="mx-2 mb-0 pt-2 border-top-2">
      <FormattedMessage {...messages.alreadyHaveAcc} />
      <button onClick={props.backToOptions} className="btn btn-link">
        <FormattedMessage {...messages.login} />
      </button>
    </p>
  </div>
);

SignUpOptions.propTypes = {
  backToOptions: PropTypes.func.isRequired,
  continueSignUp: PropTypes.func.isRequired,
};

export default SignUpOptions;
