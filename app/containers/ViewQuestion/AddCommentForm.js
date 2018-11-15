import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import AuthenticatedButton from 'containers/AuthenticatedButton';

import { strLength1000, required } from 'components/FormFields/validate';

import TextareaField from 'components/FormFields/TextareaField';

import { ADD_COMMENT_FORM, TEXTAREA_ANSWER_FORM } from './constants';
import messages from './messages';

const AddCommentForm = props => (
  <div className="add-comment">
    <form onSubmit={props.handleSubmit(props.postComment)}>
      <div>
        <Field
          name={TEXTAREA_ANSWER_FORM}
          disabled={props.postCommentLoading}
          component={TextareaField}
          validate={[strLength1000, required]}
          warn={[strLength1000, required]}
        />
      </div>
      <div>
        <AuthenticatedButton
          isLoading={props.postCommentLoading}
          className="btn btn-secondary"
          buttonContent={props.translations[messages.postCommentButton.id]}
          disabled={
            props.invalid || props.submitting || props.postCommentLoading
          }
          type="submit"
        />
      </div>
    </form>
  </div>
);

AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  postComment: PropTypes.func,
  postCommentLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: ADD_COMMENT_FORM,
})(AddCommentForm);
