import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/cdk';
import { CognitoProps } from './cognito';

export default (parent: Construct, provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty, props: CognitoProps) =>
  new cloudformation.IdentityPoolResource(parent, 'identityPool', {
    identityPoolName: `${props.envType}-IdentityPool`,
    // 未認証もアクセス可能
    allowUnauthenticatedIdentities: true,
    // Provider：Cognito
    cognitoIdentityProviders: [
      provider,
    ],
  });
