import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { translationMessages } from 'i18n';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import messages from 'common-messages';

import { scrollToErrorField } from 'utils/animation';
import {
  isAnswerOfficial,
  communityAdminOfficialAnswerPermission,
} from 'utils/properties';
import { strLength25x30000, required } from 'components/FormFields/validate';

import TextBlock from 'components/FormFields/TextBlock';
import TextEditor from 'components/FormFields/TextEditor';
import { reactMDEOptions } from 'components/TextEditor/options';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { TEXT_SECONDARY } from 'style-constants';

import answerFormMessages from './messages';
import { ANSWER_TYPE_FORM, TEXT_EDITOR_ANSWER_FORM } from './constants';
import Wrapper from '../FormFields/Wrapper';
import Span from '../Span';
import Checkbox from '../Input/Checkbox';

export const PreviewWrapper = styled.div`
  background: linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 8px 1px, 1px 8px;
  padding: 12px 0;
`;

export const AnswerForm = ({
  handleSubmit,
  sendAnswer,
  sendAnswerLoading,
  sendButtonId,
  submitButtonName,
  previewLabel,
  textEditorValue,
  answerTypeLabel,
  isOfficialRepresentative,
}) => (
  <FormBox onSubmit={handleSubmit(sendAnswer)}>
    <Field
      name={TEXT_EDITOR_ANSWER_FORM}
      component={TextEditor}
      buttonConfig={reactMDEOptions}
      placeholder=""
      labelMessage={answerFormMessages.titleLabel}
      validate={[required, strLength25x30000]}
    />
    {isOfficialRepresentative && (
      <Field
        name={ANSWER_TYPE_FORM}
        component={Checkbox}
        disabled={sendAnswerLoading}
        label={<span>{answerTypeLabel}</span>}
        previewLabel={previewLabel}
        width="90px"
      />
    )}
    <Wrapper label={previewLabel} className="mt-3">
      <PreviewWrapper>
        {textEditorValue ? (
          <TextBlock className="my-2" content={textEditorValue} />
        ) : (
          <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
            <FormattedMessage {...messages.nothingToSeeYet} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
    <Button id={sendButtonId} disabled={sendAnswerLoading} type="submit">
      {submitButtonName}
    </Button>
  </FormBox>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  previewLabel: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
  communityId: PropTypes.number,
  textEditorValue: PropTypes.string,
  answerTypeLabel: PropTypes.string,
  isOfficialRepresentative: PropTypes.bool,
  properties: PropTypes.array,
  questionView: PropTypes.bool,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
  form: 'answerForm',
})(AnswerForm);

export default React.memo(
  connect(
    (
      state,
      { answer, communityId, properties, questionView, form: formName },
    ) => {
      const form = state.toJS().form[formName] || { values: {} };
      const locale = makeSelectLocale()(state);
      const translate = translationMessages[locale];
      const profileInfo = makeSelectProfileInfo()(state);
      const official = isAnswerOfficial({ properties, id: true });
      const isOfficialRepresentative = communityAdminOfficialAnswerPermission(
        profileInfo?.permissions,
        communityId,
      );

      return {
        enableReinitialize: true,
        isOfficialRepresentative,
        textEditorValue: form.values[TEXT_EDITOR_ANSWER_FORM],
        answerTypeLabel: translate[messages.official.id],
        initialValues: {
          [TEXT_EDITOR_ANSWER_FORM]: answer,
          [ANSWER_TYPE_FORM]: questionView
            ? isOfficialRepresentative
            : official,
        },
      };
    },
  )(FormClone),
);
