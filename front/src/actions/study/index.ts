export * from './saveNewwords';
export * from './clearNewwords';
export * from './saveStudyList';
export * from './clearStudyList';
export * from './prevCard';
export * from './nextCard';

import { SaveNewwordsAction } from './saveNewwords';
import { ClearNewwordsAction } from './clearNewwords';
import { SaveStudyListAction } from './saveStudyList';
import { ClearStudyListAction } from './clearStudyList';
import { PrevCardAction } from './prevCard';
import { NextCardAction } from './nextCard';

export interface Actions {
  saveNewwords: SaveNewwordsAction;
  clearNewwords: ClearNewwordsAction;
  saveStudyList: SaveStudyListAction;
  clearStudyList: ClearStudyListAction;
  prevCard: PrevCardAction;
  nextCard: NextCardAction;
}
