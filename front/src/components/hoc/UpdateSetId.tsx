// import * as React from 'react';
// import { UpdatePathProps, UpdatePathVariables, ScreenInfo, UpdateSetIdVariables, UpdateSetIdProps, StatusInfo, UpdateSetIdChildProps, UpdatePathChildProps } from 'typings/local';
// import { UPDATE_PATH, UPDATE_SET_ID } from '@gql';
// import { graphql, compose } from 'react-apollo';
// import { Link } from 'react-router-dom';

// class UpdatePath extends React.Component<Props> {

//   handleClick = () => {
//     const { updateSetId, id } = this.props;

//     if (!updateSetId) return;

//     // 選択中のステータス更新
//     updateSetId(id);
//   }

//   render() {
//     const { to, ...props } = this.props;

//     return (
//       <Link
//         to={to}
//         onClick={this.handleClick}
//         {...props}
//       />
//     );
//   }
// }

// export interface Props extends UpdateSetIdProps { }

// export default graphql<UpdateSetIdProps, StatusInfo, UpdateSetIdVariables, UpdateSetIdChildProps>(UPDATE_SET_ID, {
//   props: ({ mutate, ownProps }) => ({
//     ...ownProps,
//     updateSetId: (id: string) => {
//       mutate && mutate({
//         variables: { id },
//       });
//     },
//   }),
// })(UpdatePath);
