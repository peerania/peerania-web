/* eslint camelcase: 0 */
export const home = () => `/`;
export const faq = () => `/faq`;
export const profile_view = id => `/users/${id}`;
export const profile_edit = id => `/users/edit/${id}`;
export const questions = () => `/questions`;
export const question_view = id => `/questions/${id}`;
export const question_edit = questionid => `/questions/${questionid}/edit`;
export const answer_edit = (questionid, answerid) =>
  `/questions/${questionid}/answers/${answerid}/edit`;
export const question_ask = () => `/questions/ask`;
export const no_access = () => `/no-access`;
export const feed = () => `/feed`;
export const communities = () => `/communities`;
export const communities_create = () => `/communities/create`;
export const suggestedCommunities = () => `/suggested_communities`;
