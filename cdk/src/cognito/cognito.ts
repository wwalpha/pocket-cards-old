import { cloudformation } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/cdk';
import { CognitoProps } from './index.d';
import { UserPool, UserPoolClient } from './index';

export class Cognito extends Construct {
  constructor(parent: Construct, name: string, props: CognitoProps) {
    super(parent, name);


    const userpool = UserPool(props);
    const userPoolClient = UserPoolClient(userpool.id, props);


    // Identity Pool
    const pool = new cloudformation.IdentityPoolResource(this, 'identityPool', {
      identityPoolName: `${props.envType}-IdentityPool`,
      // 未認証もアクセス可能
      allowUnauthenticatedIdentities: true,
      // Provider：Cognito
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.id,
          providerName: userpool.userPoolProviderName,
        }
      ]
    });
  }
}
