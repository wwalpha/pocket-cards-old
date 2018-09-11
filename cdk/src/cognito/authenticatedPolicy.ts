import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, ServicePrincipal, PolicyStatement, PolicyStatementEffect } from '@aws-cdk/cdk';
import { CognitoProps } from './cognito';

export default (parent: Construct, props: CognitoProps) => {
  const policyStmt = new PolicyStatement(PolicyStatementEffect.Allow);
  policyStmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*', 'cognito-identity:*', 'execute-api:Invoke');
  policyStmt.addResource('*');

  const policy = new Policy(parent, 'AuthenticatedPolicy', {
    policyName: `${props.envType}-AuthenticatedPolicy`,
    statements: [policyStmt],
  });

  const role = new Role(parent, 'AuthenticatedRole', {
    roleName: `${props.envType}-CognitoAuthenticatedRole`,
    assumedBy: new ServicePrincipal('cognito-identity.amazonaws.com'),
  });

  role.attachManagedPolicy(policy);
};
