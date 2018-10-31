import { Record } from 'immutable';

export interface StudyProps {
  newwords: string[];
  studies: string[];
  index: number;
  card?: any;
}

export default class Study extends Record<StudyProps>({
  newwords: [],
  studies: [],
  index: -1,
}) {

}
