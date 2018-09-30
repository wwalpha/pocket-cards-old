import { CommonProps } from '../utils';
import { LambdaOutput } from '../lambda';

export { default as UserPool } from './userPool';
export { default as UserPoolClient } from './userPoolClient';
export { default as IdentityPool } from './identityPool';
export { default as IdentityPoolRoleAttachment } from './identityPoolRoleAttachment';


export interface CognitoInput extends CommonProps {
  lambda: LambdaOutput,
}

export interface CognitoOutput {
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId: string;
}
