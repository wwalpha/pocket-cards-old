import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/cdk';
import { CognitoInput } from './cognito';
import { PROJECT_NAME } from '../utils/consts';

export default (parent: Construct, provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty, props: CognitoInput): cloudformation.IdentityPoolResource =>
  new cloudformation.IdentityPoolResource(parent, 'IdentityPoolResource', {
    identityPoolName: `${props.envType}_${PROJECT_NAME}_IdentityPool`,
    // 未認証もアクセス可能
    allowUnauthenticatedIdentities: true,
    // Provider：Cognito
    cognitoIdentityProviders: [
      provider,
    ],
  });
