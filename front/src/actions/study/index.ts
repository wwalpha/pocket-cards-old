export * from './saveNewwords';
export * from './clearNewwords';
export * from './saveStudySet';
export * from './clearStudySet';
export * from './prevCard';
export * from './nextCard';

import { SaveNewwordsAction } from './saveNewwords';
import { ClearNewwordsAction } from './clearNewwords';
import { SaveStudySetAction } from './saveStudySet';
import { ClearStudySetAction } from './clearStudySet';
import { PrevCardAction } from './prevCard';
import { NextCardAction } from './nextCard';

export interface Actions {
  saveNewwords: SaveNewwordsAction;
  clearNewwords: ClearNewwordsAction;
  saveStudySet: SaveStudySetAction;
  clearStudySet: ClearStudySetAction;
  prevCard: PrevCardAction;
  nextCard: NextCardAction;
}
