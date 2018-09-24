import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/cdk';
import { UserPool, UserPoolClient, IdentityPool, IdentityPoolRoleAttachment } from './index';
import { CommonProps } from '../common';
import { unauthenticatedRole, authenticatedRole } from '../common/roles/cognito';

export default (parent: Construct, props: CognitoInput): CognitoOutput => {
  const userpool = UserPool(parent, props);
  const userPoolClient = UserPoolClient(parent, userpool.ref);

  // Cognito Provider
  const provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty = {
    clientId: userPoolClient.id,
    providerName: userpool.userPoolProviderName,
  };

  // Identity Pool
  const identityPool = IdentityPool(parent, provider, props);

  IdentityPoolRoleAttachment(parent, {
    identityPoolId: identityPool.ref,
    authenticated: authenticatedRole(parent, identityPool.ref, {
      ...props,
      roleName: 'AuthenticatedRole',
      principal: 'cognito-identity.amazonaws.com',
      policyName: 'AuthenticatedPolicy',
    }).roleArn,
    unauthenticated: unauthenticatedRole(parent, identityPool.ref, {
      ...props,
      roleName: 'UnauthenticatedRole',
      principal: 'cognito-identity.amazonaws.com',
      policyName: 'UnauthenticatedPolicy',
    }).roleArn,
  });

  const output: CognitoOutput = {
    userPoolId: userpool.ref,
    userPoolClientId: userPoolClient.id,
  };

  return output;
};

export interface CognitoInput extends CommonProps {
}

export interface CognitoOutput {
  userPoolId: string;
  userPoolClientId: string;
}
