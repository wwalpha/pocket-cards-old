import { Construct } from '@aws-cdk/cdk';
import { PROJECT_NAME } from '../common/consts';
import { Project, ComputeType, LinuxBuildImage, NoBuildArtifacts, GitHubSource } from '@aws-cdk/aws-codebuild';
import { CodeBuildInput } from './codebuild';
import { Role } from '@aws-cdk/aws-iam';

export default (parent: Construct, props: CodeBuildInput, role: Role) => new Project(
  parent,
  'ProjectResource',
  {
    projectName: `${props.envType}-${PROJECT_NAME}`,
    environment: {
      computeType: ComputeType.Small,
      buildImage: LinuxBuildImage.UBUNTU_14_04_NODEJS_8_11_0,
      priviledged: false,
    },
    role,
    artifacts: new NoBuildArtifacts(),
    source: new GitHubSource('https://github.com/wwalpha/pocket-cards', {}),
  },
);
