import { WithStyles, StyleRules } from '@material-ui/core/styles';
// import { Query } from 'react-apollo';

export interface SetsQuery {
  sets: ({
    __typename: 'Sets',
    name: string;
    id: string;
  });
}

export interface Set {
  id: string;
  name: string;
}

export interface SetsVars {
  sets: Set[];
}

export interface Props extends WithStyles<StyleRules> {
}
