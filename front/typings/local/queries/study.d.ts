import { WordInput } from "typings/local";

/** Query Status */
export interface Study {
  study: Study_study
}

export interface Card {
  __typename: 'Card';
  word: string;
  pronunciation?: string | null;
  vocabulary?: string | null;
  times: number;
}

export interface Study_study {
  __typename: 'Study';
  list: WordInput[];
  index: number;
  card: Card;
}
