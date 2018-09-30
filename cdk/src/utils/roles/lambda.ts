import { Construct, ServicePrincipal } from '@aws-cdk/cdk';
import { Role } from '@aws-cdk/aws-iam';
import { PROJECT_NAME } from '../consts';
import { lambdaBasic } from '../policy';
import { RoleProps } from '.';

/** Lambda基本ロール */
export default (parent: Construct, props: RoleProps): Role => {
  const role = new Role(parent, `${props.roleName}`, {
    roleName: `${props.envType}-${PROJECT_NAME}-Lambda-${props.roleName}`,
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
  });

  role.attachInlinePolicy(lambdaBasic(parent, props.roleName));

  return role;
};
