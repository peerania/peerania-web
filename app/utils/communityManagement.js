import JSBI from 'jsbi';
import communitiesConfig from 'communities-config';

import _get from 'lodash/get';

import { saveText, getText, getFileUrl } from './ipfs';
import { uploadImg } from './profileManagement';

import {
  TAGS_TABLE,
  COMMUNITIES_TABLE,
  CREATED_TAGS_TABLE,
  CREATED_COMMUNITIES_TABLE,
  ALL_COMMUNITIES_SCOPE,
  UNFOLLOW_COMM,
  FOLLOW_COMM,
  CREATE_COMMUNITY,
  VOTE_TO_CREATE_COMMUNITY,
  VOTE_TO_DELETE_COMMUNITY,
  CREATE_TAG,
  VOTE_TO_CREATE_TAG,
  VOTE_TO_DELETE_TAG,
} from './constants';

export const isSingleCommunityWebsite = () =>
  +Object.keys(communitiesConfig).find(
    id => communitiesConfig[id].origin === window.location.origin,
  );

export const singleCommunityStyles = () =>
  _get(communitiesConfig, [isSingleCommunityWebsite(), 'styles'], {});

export const singleCommunityColors = () =>
  _get(singleCommunityStyles(), 'colors', {});

export const singleCommunityFonts = () =>
  _get(singleCommunityStyles(), 'fonts', {});

export function hasCommunitySingleWebsite(commId) {
  return communitiesConfig[commId] ? communitiesConfig[commId].origin : false;
}

export function getFollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => followedcommunities.includes(x.id));
}

export function getUnfollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => !followedcommunities.includes(x.id));
}

/* eslint-disable */
export function getTagScope(communityId) {
  const charmap = '.12345abcdefghijklmnopqrstuvwxyz';
  const mask = JSBI.BigInt('0xF800000000000000');
  const mask64 = JSBI.BigInt('0xFFFFFFFFFFFFFFFF');
  const zero = JSBI.BigInt(0);
  const five = JSBI.BigInt(5);
  let v = JSBI.add(
    JSBI.BigInt('3774731489195851776'),
    JSBI.BigInt(communityId),
  );

  let ret = '';

  for (let i = 0; i < 13; i++) {
    v = JSBI.bitwiseAnd(v, mask64);
    if (v.toString() === zero.toString()) break;
    const indx = JSBI.signedRightShift(
      JSBI.bitwiseAnd(v, mask),
      JSBI.BigInt(i === 12 ? 60 : 59),
    );

    ret += charmap[indx.toString()];
    v = JSBI.leftShift(v, five);
  }

  return ret;
}
/* eslint-enable */

export async function suggestTag(eosService, selectedAccount, tag) {
  const tagIpfsHash = await saveText(JSON.stringify(tag));

  await eosService.sendTransaction(
    selectedAccount,
    CREATE_TAG,
    {
      user: selectedAccount,
      community_id: +tag.communityId,
      name: tag.name,
      ipfs_description: tagIpfsHash,
    },
    null,
    true,
  );
}

export async function getSuggestedTags(
  eosService,
  communityId,
  lowerBound,
  limit,
) {
  const { rows } = await eosService.getTableRows(
    CREATED_TAGS_TABLE,
    getTagScope(communityId),
    lowerBound,
    limit,
  );

  await Promise.all(
    rows.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return rows;
}

export async function getExistingTags(tags) {
  await Promise.all(
    tags.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return tags;
}

export async function upVoteToCreateTag(
  eosService,
  selectedAccount,
  communityId,
  tagid,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_CREATE_TAG, {
    user: selectedAccount,
    community_id: +communityId,
    tag_id: +tagid,
  });
}

export async function downVoteToCreateTag(
  eosService,
  selectedAccount,
  communityId,
  tagid,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_DELETE_TAG, {
    user: selectedAccount,
    community_id: +communityId,
    tag_id: +tagid,
  });
}

/* eslint no-param-reassign: 0 */
export const getAllCommunities = async (eosService, count) => {
  let limit = count;
  let rows = [];
  let more = true;
  let lowerBound = 0;

  while (rows.length < count && more && limit > 0) {
    // eslint-disable-next-line no-await-in-loop
    const { rows: newRows, more: hasMore } = await eosService.getTableRows(
      COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      lowerBound,
      limit,
    );

    rows = [...rows, ...newRows];
    more = hasMore;
    lowerBound = rows[rows.length - 1].id;
    limit -= newRows.length;
  }

  const updatedRows = await Promise.all(
    rows.map(async x => {
      const { description, main_description, language, avatar } = JSON.parse(
        await getText(x.ipfs_description),
      );
      const { rows: tagRows } = await eosService.getTableRows(
        TAGS_TABLE,
        getTagScope(x.id),
        0,
        -1,
      );

      return {
        ...x,
        label: x.name,
        value: x.id,
        avatar: getFileUrl(avatar),
        description,
        main_description,
        language,
        tags: tagRows.map(tag => ({ ...tag, label: tag.name, value: tag.id })),
      };
    }),
  );

  return updatedRows;
};

export async function getSuggestedCommunities(eosService, lowerBound, limit) {
  const { rows } = await eosService.getTableRows(
    CREATED_COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    lowerBound,
    limit,
  );

  await Promise.all(
    rows.map(async x => {
      const { avatar, description, main_description, language } = JSON.parse(
        await getText(x.ipfs_description),
      );

      x.avatar = getFileUrl(avatar);
      x.description = description;
      x.main_description = main_description;
      x.language = language;
    }),
  );

  return rows;
}

export async function unfollowCommunity(
  eosService,
  communityIdFilter,
  selectedAccount,
) {
  await eosService.sendTransaction(selectedAccount, UNFOLLOW_COMM, {
    user: selectedAccount,
    community_id: +communityIdFilter,
  });
}

export async function followCommunity(
  eosService,
  communityIdFilter,
  selectedAccount,
) {
  await eosService.sendTransaction(selectedAccount, FOLLOW_COMM, {
    user: selectedAccount,
    community_id: +communityIdFilter,
  });
}

/* eslint camelcase: 0 */
export async function createCommunity(eosService, selectedAccount, community) {
  const { imgHash } = await uploadImg(community.avatar);

  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...community,
      avatar: imgHash,
    }),
  );

  const suggested_tags = await Promise.all(
    community.tags.map(async x => {
      const ipfs_description = await saveText(JSON.stringify(x));

      return {
        name: x.name,
        ipfs_description,
      };
    }),
  );

  await eosService.sendTransaction(
    selectedAccount,
    CREATE_COMMUNITY,
    {
      user: selectedAccount,
      name: community.name,
      ipfs_description: communityIpfsHash,
      suggested_tags,
    },
    null,
    true,
  );
}

export async function upVoteToCreateCommunity(
  eosService,
  selectedAccount,
  communityId,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_CREATE_COMMUNITY, {
    user: selectedAccount,
    community_id: +communityId,
  });
}

export async function downVoteToCreateCommunity(
  eosService,
  selectedAccount,
  communityId,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_DELETE_COMMUNITY, {
    user: selectedAccount,
    community_id: +communityId,
  });
}
