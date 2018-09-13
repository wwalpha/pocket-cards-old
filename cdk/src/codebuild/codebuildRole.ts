import { Construct, PolicyStatement, PolicyStatementEffect, Arn, ServicePrincipal } from '@aws-cdk/cdk';
import { PROJECT_NAME } from '../common/consts';
import { Role, Policy } from '@aws-cdk/aws-iam';
import { CodeBuildInput } from './codebuild';

export default (parent: Construct, props: CodeBuildInput): Role => {
  const role = new Role(parent, 'CodeBuildRole', {
    roleName: `${props.envType}-${PROJECT_NAME}-CodeBuildRole`,
    assumedBy: new ServicePrincipal('codebuild.amazonaws.com'),
  });

  const stmt1 = new PolicyStatement(PolicyStatementEffect.Allow)
    .addAction('logs:CreateLogGroup')
    .addAction('logs:CreateLogStream')
    .addAction('logs:PutLogEvents')
    .addResource(new Arn('arn:aws:logs:ap-northeast-1:562849865336:log-group:/aws/codebuild/test'))
    .addResource(new Arn('arn:aws:logs:ap-northeast-1:562849865336:log-group:/aws/codebuild/test:*'));

  const stmt2 = new PolicyStatement(PolicyStatementEffect.Allow)
    .addAction('s3:PutObject')
    .addAction('s3:GetObject')
    .addAction('s3:GetObjectVersion')
    .addResource(new Arn('arn:aws:s3:::codepipeline-ap-northeast-1-*'));

  const policy = new Policy(parent, 'CodeBuildPolicy', {
    policyName: `${props.envType}-${PROJECT_NAME}-CodeBuildPolicy`,
    statements: [stmt1, stmt2],
  });

  policy.attachToRole(role);

  return role;
};
