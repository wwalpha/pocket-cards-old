import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct, Token } from '@aws-cdk/cdk';
import { UserPool, UserPoolClient, IdentityPool, IdentityPoolRoleAttachment, AuthenticatedRole, UnauthenticatedRole } from './index';
import { CommonProps } from 'common/index';

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
    authenticated: AuthenticatedRole(parent, identityPool.ref, props).roleArn,
    unauthenticated: UnauthenticatedRole(parent, identityPool.ref, props).roleArn,
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
  userPoolId: Token;
  userPoolClientId: string;
}
