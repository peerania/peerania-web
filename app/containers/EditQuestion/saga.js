import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getQuestionData } from 'containers/ViewQuestion/saga';

import { getAskedQuestion, editQuestion } from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import {
  GET_ASKED_QUESTION,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
} from './constants';

import {
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestionSuccess,
  editQuestionErr,
} from './actions';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(() => eosService.getSelectedAccount());

    const questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    if (questionData.user !== user) {
      yield put(getAskedQuestionErr());
      yield call(() => createdHistory.push(routes.noAccess()));
    }

    const question = yield call(() =>
      getAskedQuestion(questionData.ipfs_link, eosService),
    );

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    yield call(() =>
      editQuestion(selectedAccount, questionId, question, eosService),
    );

    yield put(editQuestionSuccess());
    yield call(() => createdHistory.push(routes.questionView(questionId)));
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(EDIT_QUESTION_ERROR, errorToastHandlingWithDefaultText);
}
