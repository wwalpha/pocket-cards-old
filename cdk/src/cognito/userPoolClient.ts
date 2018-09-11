import { cloudformation } from "@aws-cdk/aws-cognito";
import { CognitoProps } from './index.d';

export default (userPoolId: string, props: CognitoProps) => new cloudformation.UserPoolClientResource(
  this,
  'UserPoolClientResource',
  {
    clientName: 'mobile-client',
    generateSecret: false,
    userPoolId,
  }
);
