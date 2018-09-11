import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, ServicePrincipal, PolicyStatement, PolicyStatementEffect } from '@aws-cdk/cdk';
import { CognitoProps } from './cognito';

export default (parent: Construct, props: CognitoProps) => {
  const policyStmt = new PolicyStatement(PolicyStatementEffect.Allow);
  policyStmt.addActions('mobileanalytics:PutEvents', 'cognito-sync:*');
  policyStmt.addResource('*');

  const policy = new Policy(parent, 'UnauthenticatedPolicy', {
    policyName: `${props.envType}-UnauthenticatedPolicy`,
    statements: [policyStmt],
  });

  const role = new Role(parent, 'UnauthenticatedRole', {
    roleName: `${props.envType}-CognitoUnauthenticatedRole`,
    assumedBy: new ServicePrincipal('cognito-identity.amazonaws.com'),
  });

  role.attachManagedPolicy(policy);
};
