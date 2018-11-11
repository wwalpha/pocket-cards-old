// import { SetListVariables, SetList, SetList_setList } from 'typings/graphql';
// import { ChildProps, graphql } from 'react-apollo';
// import { GQL_SET_LIST } from '@gql/appsync';

// export interface Props {
//   setList: SetList_setList[];
// }

// type TChildProps = ChildProps<Props, SetList, SetListVariables>;

// /** セット削除 */
// export default graphql<Props, SetList, SetListVariables, TChildProps>(GQL_SET_LIST, {
//   props: ({ data }) => ({
//     setList: (data ? data.setList : []) as SetList_setList[],
//   }),
// });
