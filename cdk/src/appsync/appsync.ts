import { Construct, Token } from '@aws-cdk/cdk';
import { GraphQLApi } from './index';
import { CommonProps } from '../common/index';

export default (parent: Construct, props: AppSyncProps) => {
  GraphQLApi(parent, props);

};

export interface AppSyncProps extends CommonProps {
  userPoolId: Token;
}
