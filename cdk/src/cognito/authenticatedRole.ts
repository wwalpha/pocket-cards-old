import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, PolicyStatement, PolicyStatementEffect, Token, FederatedPrincipal, Arn } from '@aws-cdk/cdk';
import { CognitoInput } from './cognito';
import { PROJECT_NAME } from '../common/consts';

export default (parent: Construct, identityPool: Token, props: CognitoInput): Role => {
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

  const stmt = new PolicyStatement(PolicyStatementEffect.Allow);
  stmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*', 'cognito-identity:*', 'execute-api:Invoke');
  stmt.addResource(new Arn('*'));

  const policy = new Policy(parent, 'AuthenticatedPolicy', {
    policyName: `${props.envType}-${PROJECT_NAME}-AuthenticatedPolicy`,
    statements: [stmt],
  });

  policy.attachToRole(role);

  return role;
};
