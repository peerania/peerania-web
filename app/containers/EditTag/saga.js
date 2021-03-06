import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { communityAdminCreateTagPermission } from 'utils/properties';
import { editTagCM } from 'utils/communityManagement';
import { saveText } from 'utils/ipfs';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
  selectIsGlobalModerator,
} from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';
import { selectEditTagData } from 'containers/TagsOfCommunity/selectors';
import { selectExistingTags } from 'containers/Tags/selectors';

import { updateTagOfCommunity } from 'containers/DataCacheProvider/actions';
import {
  getEditTagFormSuccess,
  getEditTagFormErr,
  editTagSuccess,
  editTagErr,
} from './actions';
import { EDIT_TAG, GET_EDIT_TAG_FORM } from './constants';

export function* getEditTagFormWorker({ communityId }) {
  try {
    const account = yield select(makeSelectAccount());
    const isGlobalModerator = yield select(selectIsGlobalModerator());

    const profileInfo = yield select(makeSelectProfileInfo());
    const createTagPermission = communityAdminCreateTagPermission(
      profileInfo?.permissions,
      communityId,
    );

    if (!account || (!isGlobalModerator && !createTagPermission)) {
      yield call(
        createdHistory.push,
        communityId ? routes.communityTags(communityId) : routes.tags(),
      );
    } else {
      yield put(getEditTagFormSuccess());
    }
  } catch (err) {
    yield put(getEditTagFormErr(err));
  }
}

export function* editTagWorker({ tag, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);
    const { communityId, tagId } = yield select(selectEditTagData());

    const tagsOfCommunity = yield select(selectExistingTags());
    const editingTag = tagsOfCommunity.find(tg => tg.id === tagId);
    const tagIpfsHash = yield saveText(JSON.stringify(tag));
    const updatedTag = {
      ...editingTag,
      name: tag.name,
      label: tag.name,
      description: tag.description,
      ipfs_description: tagIpfsHash,
    };

    yield call(editTagCM, eosService, selectedAccount, tag, tagIpfsHash);
    yield put(updateTagOfCommunity(communityId, tagId, updatedTag));

    yield put(editTagSuccess());

    yield call(reset);

    yield call(
      createdHistory.push,
      communityId ? routes.communityTags(communityId) : routes.tags(),
    );
  } catch (err) {
    yield put(editTagErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_EDIT_TAG_FORM, getEditTagFormWorker);
  yield takeLatest(EDIT_TAG, editTagWorker);
}
