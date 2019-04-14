/*
 *
 * SuggestedCommunities actions
 *
 */

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
} from './constants';

export function getSuggestedCommunities() {
  return {
    type: GET_SUGGESTED_COMMUNITIES,
  };
}

export function getSuggestedCommunitiesSuccess(suggestedCommunities) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_SUCCESS,
    suggestedCommunities,
  };
}

export function getSuggestedCommunitiesErr(getSuggestedCommunitiesError) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_ERROR,
    getSuggestedCommunitiesError,
  };
}