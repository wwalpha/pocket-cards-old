import { Construct, Token } from '@aws-cdk/cdk';
import { PROJECT_NAME } from '../common/consts';
import { cloudformation } from '@aws-cdk/aws-codebuild';
import { CodeBuildInput } from './codebuild';

export default (parent: Construct, props: CodeBuildInput, roleArn: Token) => new cloudformation.ProjectResource(
  parent,
  'ProjectResource',
  {
    projectName: `${props.envType}-${PROJECT_NAME}`,
    artifacts: {
      type: 'NO_ARTIFACTS',
    },
    environment: {
      type: 'LINUX_CONTAINER',
      computeType: 'BUILD_GENERAL1_SMALL',
      image: 'aws/codebuild/nodejs:8.11.0',
      privilegedMode: false,
    },
    source: {
      type: 'GITHUB',
      location: 'https://github.com/wwalpha/pocket-cards',
      gitCloneDepth: 1,
    },
    serviceRole: roleArn,
  },
);
