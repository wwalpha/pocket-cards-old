import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/cdk';
import { UserPool, UserPoolClient, IdentityPool } from './index';
import { CommonProps } from '../common';

export default (parent: Construct, props: CognitoProps) => {
  const userpool = UserPool(parent, props);
  const userPoolClient = UserPoolClient(parent, userpool.ref);

  // Cognito Provider
  const provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty = {
    clientId: userPoolClient.id,
    providerName: userpool.userPoolProviderName,
  };

  // Identity Pool
  const identityPool = IdentityPool(parent, provider, props);
};

export interface CognitoProps extends CommonProps {
}
