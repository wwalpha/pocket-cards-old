import { default as updateUser } from './updateUser';
import { default as updatePath } from './updatePath';
import { default as updateSetId } from './updateSetId';
// import { default as clearNewwords } from './clearNewwords';
// import { default as clearWordList } from './study/clearWordList';
import { default as nextCard } from './study/nextCard';
import { default as prevCard } from './study/prevCard';

export const resolvers = {
  Mutation: {
    updateUser,
    updatePath,
    updateSetId,
    // clearNewwords,
    // clearWordList,
    nextCard,
    prevCard,
  },
};
