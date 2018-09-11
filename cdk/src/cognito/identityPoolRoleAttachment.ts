import { cloudformation } from '@aws-cdk/aws-cognito';
import { Token, Construct } from '@aws-cdk/cdk';

export interface RoleAttachmentProps {
  identityPoolId: Token;
  unauthenticated: Token;
  authenticated: Token;
}

export default (parent: Construct, props: RoleAttachmentProps) => new cloudformation.IdentityPoolRoleAttachmentResource(
  parent,
  'IdentityPoolRoleAttachmentResource',
  {
    identityPoolId: props.identityPoolId,
    roles: {
      unauthenticated: props.unauthenticated,
      authenticated: props.authenticated,
    },
  },
);
