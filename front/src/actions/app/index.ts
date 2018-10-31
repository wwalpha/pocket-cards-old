export * from './updatePath';
export * from './updateSetId';

import { UpdatePathAction } from './updatePath';
import { UpdateSetIdAction } from './updateSetId';

export interface Actions {
  updatePath: UpdatePathAction;
  updateSetId: UpdateSetIdAction;
}
