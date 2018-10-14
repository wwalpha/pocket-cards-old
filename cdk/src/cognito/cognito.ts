import { cloudformation } from '@aws-cdk/aws-cognito';
import { Stack, App, Output } from '@aws-cdk/cdk';
import { UserPool, UserPoolClient, IdentityPool, IdentityPoolRoleAttachment, CognitoInput, CognitoOutput } from '.';
import { AuthenticatedRole, UnauthenticatedRole } from '../utils/roles';
import appsync from '../appsync/appsync';
import { PROJECT_NAME } from '../utils/consts';

export default class CognitoStack extends Stack {
  public readonly output: CognitoOutput;

  constructor(parent: App, name: string, props: CognitoInput) {
    super(parent, name, props);

    const userPool = UserPool(this, props);
    const userPoolClient = UserPoolClient(this, userPool.ref);

    // Cognito Provider
    const provider: cloudformation.IdentityPoolResource.CognitoIdentityProviderProperty = {
      clientId: userPoolClient.userPoolClientId,
      providerName: userPool.userPoolProviderName,
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
      userPoolId: userPool.userPoolId,
      userPoolClientId: userPoolClient.userPoolClientId,
    };

    // Appsync
    appsync(this, {
      cognito: this.output,
      envType: props.envType,
      lambda: props.lambda,
      s3: props.s3,
    })

    new Output(this, 'UserPoolId', {
      export: `${props.env}-${PROJECT_NAME}-UserPoolId`,
      value: userPool.userPoolId
    });
    new Output(this, 'UserPoolClientId', {
      export: `${props.env}-${PROJECT_NAME}-UserPoolClientId`,
      value: userPoolClient.userPoolClientId
    });
    new Output(this, 'IdentityPoolId', {
      export: `${props.env}-${PROJECT_NAME}-IdentityPoolId`,
      value: identityPool.identityPoolId
    });
  }
}
