import { cloudformation } from '@aws-cdk/aws-cognito';
import { Stack, App } from '@aws-cdk/cdk';
import { UserPool, UserPoolClient, IdentityPool, IdentityPoolRoleAttachment, CognitoInput, CognitoOutput } from '.';
import { AuthenticatedRole, UnauthenticatedRole } from '../utils/roles';
import appsync from '../appsync/appsync';

export default class CognitoStack extends Stack {
  public readonly output: CognitoOutput;

  constructor(parent: App, name: string, props: CognitoInput) {
    super(parent, name, props);

    const userpool = UserPool(this, props);
    const userPoolClient = UserPoolClient(this, userpool.ref);

    // Cognito Provider
    const provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty = {
      clientId: userPoolClient.id,
      providerName: userpool.userPoolProviderName,
    };

    // Identity Pool
    const identityPool = IdentityPool(this, provider, props);

    IdentityPoolRoleAttachment(this, {
      identityPoolId: identityPool.ref,
      authenticated: AuthenticatedRole(this, identityPool.ref, {
        envType: props.envType,
        roleName: 'AuthenticatedRole',
        policyName: 'AuthenticatedPolicy',
      }).roleArn,
      unauthenticated: UnauthenticatedRole(this, identityPool.ref, {
        envType: props.envType,
        roleName: 'UnauthenticatedRole',
        policyName: 'UnauthenticatedPolicy',
      }).roleArn,
    });

    this.output = {
      identityPoolId: identityPool.identityPoolId,
      userPoolId: userpool.userPoolId,
      userPoolClientId: userPoolClient.userPoolClientId,
    };

    appsync(this, {
      cognito: this.output,
      envType: props.envType,
      lambda: props.lambda,
    })

  }
}
