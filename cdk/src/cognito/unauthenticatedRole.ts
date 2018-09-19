import { Policy, Role } from '@aws-cdk/aws-iam';
import { Construct, PolicyStatement, PolicyStatementEffect, FederatedPrincipal, Token, Arn } from '@aws-cdk/cdk';
import { CognitoInput } from './cognito';
import { PROJECT_NAME } from '../common/consts';

export default (parent: Construct, identityPool: Token, props: CognitoInput): Role => {

};
