// import {
//   comparePostEntriesById,
//   comparePostEntriesByLikes,
//   comparePostEntriesByMark,
//   comparePostEntriesByRating,
// } from '../../core/entities/post.js';
// import { isPostDraft, isPostRequest } from '../../core/entities/post-variation.js';
// import { createUserInfo } from '../../core/entities/user.js';
// import { getPostInfo, inbox, published, trash } from '../../local/data-managers/posts.js';
// import { users } from '../../local/data-managers/users.js';
// import type { HomePageData } from '../components/HomePage/HomePage.js';

import { getDocuments } from '../documents/index.js';

export async function data() {
  const docs = await getDocuments();

  return {
    docs,
  };
}
