import { cloudformation } from '@aws-cdk/aws-cognito';
import { Token, Construct } from '@aws-cdk/cdk';

export default (parent: Construct, userPoolId: Token) => new cloudformation.UserPoolClientResource(
  parent,
  'UserPoolClientResource',
  {
    clientName: 'mobile-client',
    generateSecret: false,
    userPoolId,
  },
);
