import { Stack, App, StackProps } from '@aws-cdk/cdk';
import { Cognito, AppSync, Dynamodb, S3, CloudFront, CodeBuild } from '.';

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const cognito = Cognito(this, {
      envType: 'dev',
    });

    AppSync(this, {
      envType: 'dev',
      userPoolId: cognito.userPoolId,
    });

    Dynamodb(this, {
      envType: 'dev',
    });

    const s3 = S3(this, {
      envType: 'dev',
    });

    // CloudFront(this, {
    //   bucketArn: s3.arn,
    //   bucketDomainName: s3.domainName,
    //   bucketRef: s3.ref,
    //   envType: 'dev',
    // });
    CodeBuild(this, {
      envType: 'dev',
    });
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());
