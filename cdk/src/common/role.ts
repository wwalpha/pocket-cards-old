import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, PolicyStatement, PolicyStatementEffect, FederatedPrincipal, Token, Arn, ServicePrincipal } from '@aws-cdk/cdk';
import { PROJECT_NAME } from './consts';
import { CommonProps } from '.';
import { lambdaBasic } from './policyStmt';

/** Cognito未認証ロール */
export const unauthenticatedRole = (parent: Construct, identityPool: Token, props: UnauthenticatedRoleProps): Role => {
  const principal = new FederatedPrincipal(
    'cognito-identity.amazonaws.com',
    {
      StringEquals: {
        'cognito-identity.amazonaws.com:aud': identityPool,
      },
      'ForAnyValue:StringLike': {
        'cognito-identity.amazonaws.com:amr': 'unauthenticated',
      },
    },
    'sts:AssumeRoleWithWebIdentity',
  );

  const role = new Role(parent, props.roleName, {
    roleName: `${props.envType}-${PROJECT_NAME}-${props.roleName}`,
    assumedBy: principal,
  });

  const policyStmt = new PolicyStatement(PolicyStatementEffect.Allow);
  policyStmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*');
  policyStmt.addResource(new Arn('*'));

  const policy = new Policy(parent, props.policyName, {
    policyName: `${props.envType}-${PROJECT_NAME}-${props.policyName}`,
    statements: [policyStmt],
  });

  policy.attachToRole(role);

  return role;
};

/** Cognito認証済 */
export const authenticatedRole = (parent: Construct, identityPool: Token, props: AuthenticatedRoleProps): Role => {
  const principal = new FederatedPrincipal(
    'cognito-identity.amazonaws.com',
    {
      StringEquals: {
        'cognito-identity.amazonaws.com:aud': identityPool,
      },
      'ForAnyValue:StringLike': {
        'cognito-identity.amazonaws.com:amr': 'authenticated',
      },
    },
    'sts:AssumeRoleWithWebIdentity',
  );

  const role = new Role(parent, props.roleName, {
    roleName: `${props.envType}-${PROJECT_NAME}-${props.roleName}`,
    assumedBy: principal,
  });

  const stmt = new PolicyStatement(PolicyStatementEffect.Allow);
  stmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*', 'cognito-identity:*', 'execute-api:Invoke');
  stmt.addResource(new Arn('*'));

  const policy = new Policy(parent, props.policyName, {
    policyName: `${props.envType}-${PROJECT_NAME}-${props.policyName}`,
    statements: [stmt],
  });

  policy.attachToRole(role);

  return role;
};

/** Lambda基本ロール */
export const lambdaBasicRole = (parent: Construct, props: RoleProps): Role => {
  const role = new Role(parent, `${props.roleName}`, {
    roleName: `${props.envType}-${PROJECT_NAME}-${props.roleName}`,
    assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
  });

  role.attachInlinePolicy(new Policy(parent, `${props.roleName}-policy`, {
    statements: [lambdaBasic(parent, props)]
  }));

  return role;
}

export interface RoleProps extends CommonProps {
  roleName: string;
}

export interface UnauthenticatedRoleProps extends RoleProps {
  // UnauthenticatedPolicy
  policyName: string;
}

export interface AuthenticatedRoleProps extends RoleProps {
  // UnauthenticatedPolicy
  policyName: string;
}
