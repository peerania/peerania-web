import {
  ASK_QUESTION_ERROR,
  ASK_QUESTION_SUCCESS,
} from 'containers/AskQuestion/constants';

import {
  CHANGE_EMAIL_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  CHANGE_EMAIL_SUCCESS,
} from 'containers/ChangeEmail/constants';

import {
  CHANGE_PASSWORD_ERROR,
  SUBMIT_EMAIL_ERROR,
  SEND_EMAIL_ERROR,
  CHANGE_PASSWORD_SUCCESS,
} from 'containers/ChangePasswordByPrevious/constants';

import {
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
} from 'containers/CreateCommunity/constants';

import {
  SUGGEST_TAG_ERROR,
  SUGGEST_TAG_SUCCESS,
} from 'containers/CreateTag/constants';

import {
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  SEND_EMAIL_ERROR as DELETE_ACCOUNT_SEND_EMAIL_ERROR,
} from 'containers/DeleteAccount/constants';

import {
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_SUCCESS,
} from 'containers/EditAnswer/constants';

import {
  SAVE_PROFILE_ERROR,
  SAVE_PROFILE_SUCCESS,
} from 'containers/EditProfilePage/constants';

import {
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
} from 'containers/EditQuestion/constants';

import {
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD_ERROR as FORGOT_PASSWORD_CHANGE_PASSWORD_ERROR,
} from 'containers/ForgotPassword/constants';

import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from 'containers/HomePage/constants';

import {
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
  SIGNUP_WITH_SCATTER_ERROR,
} from 'containers/SignUp/constants';

import {
  LOGIN_WITH_SCATTER_ERROR,
  LOGIN_WITH_EMAIL_ERROR,
  FINISH_REGISTRATION_ERROR,
} from 'containers/Login/constants';

import { LOGOUT_ERROR } from 'containers/Logout/constants';

import {
  SEND_TOKENS_ERROR,
  SEND_TOKENS_SUCCESS,
} from 'containers/SendTokens/constants';

import { SHOW_ACTIVE_KEY_ERROR } from 'containers/ShowActiveKey/constants';

import {
  SHOW_OWNER_KEY_ERROR,
  SEND_EMAIL_ERROR as SHOW_OWNER_KEY_SEND_EMAIL_ERROR,
} from 'containers/ShowOwnerKey/constants';

import { FOLLOW_HANDLER_ERROR } from 'containers/FollowCommunityButton/constants';
import { PICKUP_REWARD_ERROR } from 'containers/Wallet/constants';

import {
  UPVOTE_ERROR as COMMUNITY_UPVOTE_ERROR,
  DOWNVOTE_ERROR as COMMUNITY_DOWNVOTE_ERROR,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  UPVOTE_ERROR as TAG_UPVOTE_ERROR,
  DOWNVOTE_ERROR as TAG_DOWNVOTE_ERROR,
} from 'containers/VoteForNewTagButton/constants';

import {
  POST_COMMENT_ERROR,
  POST_ANSWER_ERROR,
  UP_VOTE_ERROR,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED_ERROR,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT_ERROR,
  VOTE_TO_DELETE_ERROR,
} from 'containers/ViewQuestion/constants';

export const errHandlingTypes = [
  ASK_QUESTION_ERROR,
  CHANGE_EMAIL_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL_ERROR,
  CHANGE_PASSWORD_ERROR,
  CREATE_COMMUNITY_ERROR,
  SUGGEST_TAG_ERROR,
  DELETE_ACCOUNT_SEND_EMAIL_ERROR,
  DELETE_ACCOUNT_ERROR,
  EDIT_ANSWER_ERROR,
  SAVE_PROFILE_ERROR,
  EDIT_QUESTION_ERROR,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL_ERROR,
  FORGOT_PASSWORD_CHANGE_PASSWORD_ERROR,
  SEND_MESSAGE_ERROR,
  EMAIL_CHECKING_ERROR,
  LOGIN_WITH_SCATTER_ERROR,
  LOGIN_WITH_EMAIL_ERROR,
  FINISH_REGISTRATION_ERROR,
  LOGOUT_ERROR,
  SEND_TOKENS_ERROR,
  SHOW_ACTIVE_KEY_ERROR,
  SHOW_OWNER_KEY_ERROR,
  SHOW_OWNER_KEY_SEND_EMAIL_ERROR,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
  SIGNUP_WITH_SCATTER_ERROR,
  FOLLOW_HANDLER_ERROR,
  PICKUP_REWARD_ERROR,
  COMMUNITY_UPVOTE_ERROR,
  TAG_UPVOTE_ERROR,
  COMMUNITY_DOWNVOTE_ERROR,
  TAG_DOWNVOTE_ERROR,
  POST_COMMENT_ERROR,
  POST_ANSWER_ERROR,
  UP_VOTE_ERROR,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED_ERROR,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT_ERROR,
  VOTE_TO_DELETE_ERROR,
];

export const successHandlingTypes = [
  ASK_QUESTION_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_COMMUNITY_SUCCESS,
  SUGGEST_TAG_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  SAVE_PROFILE_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  SEND_TOKENS_SUCCESS,
];
