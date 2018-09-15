import { Stack, App, StackProps } from '@aws-cdk/cdk';
import { Cognito, AppSync, Dynamodb, S3, CloudFront, CodeBuild } from '.';
import { CommonProps } from './common';

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const comProps: CommonProps = {
      envType: 'dev',
      region: this.env.region ? this.env.region : 'ap-northeast-1',
    };

    // Cognito
    const cognito = Cognito(this, comProps);

    // AppSync
    AppSync(this, {
      ...comProps,
      userPoolId: cognito.userPoolId,
    });

    // DynamoDB
    Dynamodb(this, comProps);

    // S3
    const s3 = S3(this, comProps);

    // CloudFront(this, {
    //   bucketArn: s3.arn,
    //   bucketDomainName: s3.domainName,
    //   bucketRef: s3.ref,
    //   envType: 'dev',
    // });

    // CodeBuild
    CodeBuild(this, comProps);
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());
