import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import {
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
} from 'utils/web_integration/src/wallet/get-owner-key/get-owner-key';

import Cookies from 'utils/cookies';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { STORED_EMAIL } from 'containers/Login/constants';
import { errorToastHandling } from 'containers/Toast/saga';

import { selectPassword } from './selectors';

import { SHOW_OWNER_KEY, SEND_EMAIL, SHOW_OWNER_KEY_ERROR } from './constants';

import {
  showOwnerKeySuccess,
  showOwnerKeyErr,
  sendEmailSuccess,
  sendEmailErr,
} from './actions';

export function* sendEmailWorker({ resetForm, email, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() => getOwnerKeyInitByPwd(email, password));

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err.message));
  }
}

export function* showOwnerKeyWorker({ resetForm, verificationCode }) {
  try {
    const email = Cookies.get(STORED_EMAIL);
    const password = yield select(selectPassword());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() =>
      getOwnerKeyByPwd(email, password, verificationCode),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { keys } = response.body;

    yield put(showOwnerKeySuccess(keys.ownerKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showOwnerKeyErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_OWNER_KEY, showOwnerKeyWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest([SHOW_OWNER_KEY_ERROR], errorToastHandling);
}
