import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, PolicyStatement, PolicyStatementEffect, Token, FederatedPrincipal } from '@aws-cdk/cdk';
import { CognitoProps } from './cognito';
import { PROJECT_NAME } from '../common/consts';

export default (parent: Construct, identityPool: Token, props: CognitoProps): Role => {
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

  const role = new Role(parent, 'AuthenticatedRole', {
    roleName: `${props.envType}-CognitoAuthenticatedRole`,
    assumedBy: principal,
  });

  const policyStmt = new PolicyStatement(PolicyStatementEffect.Allow);
  policyStmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*', 'cognito-identity:*', 'execute-api:Invoke');
  policyStmt.addResource('*');

  const policy = new Policy(parent, 'AuthenticatedPolicy', {
    policyName: `${props.envType}-${PROJECT_NAME}-AuthenticatedPolicy`,
    statements: [policyStmt],
  });

  policy.attachToRole(role);

  return role;
};
