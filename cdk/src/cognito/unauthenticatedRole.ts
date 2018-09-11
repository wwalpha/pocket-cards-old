import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, PolicyStatement, PolicyStatementEffect, FederatedPrincipal, Token } from '@aws-cdk/cdk';
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
        'cognito-identity.amazonaws.com:amr': 'unauthenticated',
      },
    },
    'sts:AssumeRoleWithWebIdentity',
  );

  const role = new Role(parent, 'UnauthenticatedRole', {
    roleName: `${props.envType}-CognitoUnauthenticatedRole`,
    assumedBy: principal,
  });

  const policyStmt = new PolicyStatement(PolicyStatementEffect.Allow);
  policyStmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*');
  policyStmt.addResource('*');

  const policy = new Policy(parent, 'UnauthenticatedPolicy', {
    policyName: `${props.envType}-${PROJECT_NAME}-UnauthenticatedPolicy`,
    statements: [policyStmt],
  });

  policy.attachToRole(role);

  return role;
};
