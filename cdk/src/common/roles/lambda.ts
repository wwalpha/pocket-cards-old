import { Construct, ServicePrincipal } from '@aws-cdk/cdk';
import { Role, Policy } from '@aws-cdk/aws-iam';
import { PROJECT_NAME } from '../consts';
import { lambdaBasic } from '../policyStmt';
import { RoleProps } from '.';

/** Lambda基本ロール */
export const lambdaBasicRole = (parent: Construct, props: RoleProps): Role => {
  const role = new Role(parent, `${props.roleName}`, {
    roleName: `${props.envType}-${PROJECT_NAME}-${props.roleName}`,
    assumedBy: new ServicePrincipal(props.principal),
  });

  role.attachInlinePolicy(new Policy(parent, `${props.roleName}-policy`, {
    statements: [lambdaBasic(props)],
  }));

  return role;
};
