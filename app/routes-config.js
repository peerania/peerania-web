/**
 *
 * Edit routes attentively - not to crash App routing
 *
 */

/* eslint camelcase: 0, prettier/prettier: 0 */
import {
  isSingleCommunityWebsite,
  hasCommunitySingleWebsite,
} from 'utils/communityManagement';
import { REFERRAL_CODE_URI } from './containers/App/constants';

const singleCommId = isSingleCommunityWebsite();

export const home = () => `/about`;

export const notFound = () => `/404`;
export const errorPage = () => `/error-occured`;

export const profileView = id => `/users/${id}`;
export const profileEdit = id => `/users/edit/${id}`;

export const userQuestions = id => `/users/${id}#questions`;
export const userAnswers = id => `/users/${id}#answers`;
export const userSettings = id => `/users/${id}#settings`;
export const userWallet = id => `/users/${id}/wallet`;

export const uniqueAnswerId = answerId => `ans${answerId}`;

export const questions = (communityid, redirectToAllQuestions) => {
  const origin = hasCommunitySingleWebsite(communityid);

  if (origin) {
    return redirectTo(origin);
  }

  if (redirectToAllQuestions) {
    return redirectTo(`${process.env.APP_LOCATION}`);
  }

  return !communityid ? `/` : `/questions/community/${communityid}/`;
};

export const questionView = (id, answerId) =>
  answerId
    ? `/questions/${id}/#${uniqueAnswerId(answerId)}`
    : `/questions/${id}`;

export const questionEdit = questionid =>
  !singleCommId ? `/questions/${questionid}/edit` : `/${questionid}/edit`;

export const answerEdit = (questionid, answerid) =>
  !singleCommId
    ? `/questions/${questionid}/answers/${answerid}/edit`
    : `/${questionid}/answers/${answerid}/edit`;

export const questionAsk = () => (!singleCommId ? `/questions/ask` : `/ask`);

export const noAccess = () => `/no-access`;

export const feed = communityid => {
  const origin = hasCommunitySingleWebsite(communityid);

  if (singleCommId) {
    return redirectTo(`${process.env.APP_LOCATION}/feed`);
  }

  if (origin && communityid !== singleCommId) {
    return redirectTo(`/feed/${communityid || ''}`);
  }

  return `/feed/${communityid || ''}`;
};

export const communities = () =>
  !singleCommId
    ? `/communities`
    : redirectTo(`${process.env.APP_LOCATION}/communities`);

export const tags = () => `/tags`;

export const redirectTo = to =>
  `/redirect/${to[0] === ':' ? to : encodeURIComponent(to)}`;

export const users = redirectToAllUsers => {
  if (redirectToAllUsers) {
    return redirectTo(`${process.env.APP_LOCATION}/users`);
  }

  return '/users';
};

export const faq = code => `/faq/${code ? `#${code}` : ``}`;
export const support = section => `/support/${section ? `#${section}` : ''}`;
export const search = q => `/search/${q || ''}`;

export const privacyPolicy = section =>
  `/privacy-policy/${section ? `#${section}` : ''}`;

export const termsAndConditions = section =>
  `/terms-and-conditions/${section ? `#${section}` : ''}`;

export const communitiesCreate = () => `/communities/create`;
export const communitiesCreatedBanner = () => `/communities/create#banner`;
export const suggestedCommunities = () => `/communities/suggested`;

export const communityTags = communityid => {
  const origin = hasCommunitySingleWebsite(communityid);

  if (origin && communityid !== singleCommId) {
    return redirectTo(`${origin}/tags`);
  }

  return !singleCommId ? `/communities/${communityid}/tags` : `/tags`;
};

export const suggestedTags = communityid =>
  !singleCommId
    ? `/communities/${communityid}/tags/suggested`
    : `/tags/suggested`;

export const tagsCreate = communityid =>
  !singleCommId ? `/tags/community/${communityid || 0}/create` : `/tags/create`;

export const registrationStage = 'signup';

export const preloaderPage = () => '/preloader-page';

export const referralPage = user => `/?${REFERRAL_CODE_URI}=${user}`;

export const signup = {
  email: {
    step: 1,
    name: `/${registrationStage}/email`,
    scatter: false,
  },
  displayName: {
    step: 1,
    name: `/${registrationStage}/with-wallet/display-name`,
    scatter: true,
  },
  emailVerification: {
    step: 2,
    name: `/${registrationStage}/email-verification`,
    scatter: false,
  },
  haveEosAccount: {
    step: 3,
    name: `/${registrationStage}/i-have-telos-account`,
    scatter: false,
  },
  dontHaveEosAccount: {
    step: 3,
    name: `/${registrationStage}/i-dont-have-telos-account`,
    scatter: false,
  },
  almostDoneWithAccount: {
    step: 4,
    name: `/${registrationStage}/i-have-telos-account/almost-done`,
    scatter: false,
  },
  almostDoneNoAccount: {
    step: 4,
    name: `/${registrationStage}/i-dont-have-telos-account/almost-done`,
    scatter: false,
  },
};
