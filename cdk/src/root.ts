import { Stack, App, AwsAccountId, AwsRegion, AwsStackId, AwsStackName } from '@aws-cdk/cdk';
import { CognitoStack, S3Stack, Lambda, DynamodbStack } from '.';
import { CommonProps } from './utils';
import { PROJECT_NAME } from './utils/consts';

class RootStack extends Stack {
  constructor(parent: App, name: string, props: CommonProps) {
    super(parent, name, props);

    this.templateOptions.metadata = {

      // all CloudFormation's pseudo-parameters are supported via the `cdk.AwsXxx` classes
      PseudoParameters: [
        new AwsAccountId(),
        new AwsRegion(),
        new AwsStackId(),
        new AwsStackName(),
      ],
    };

    // S3
    const s3 = new S3Stack(parent, `${name}-S3`, props);
    // DynamoDB
    new DynamodbStack(parent, `${name}-Dynamodb`, comProps);

    // All Lambda
    const lambda = Lambda();

    new CognitoStack(parent, `${name}-Cognito`, {
      ...comProps,
      lambda: lambda,
      s3: s3.output,
    });

    // // S3 Event
    // S3Event(this, {
    //   ...comProps,
    //   bucket: s3,
    // });

    // CloudFront(this, {
    //   bucketArn: s3.arn,
    //   bucketDomainName: s3.domainName,
    //   bucketRef: s3.ref,
    //   envType: 'dev',
    // });

    // RestApi(this, {
    //   ...comProps,
    //   lambda,
    // });

    // CodeBuild
    // CodeBuild(this, comProps);

  }
}
const ENV_TYPE = 'dev';
const comProps: CommonProps = {
  envType: ENV_TYPE,
};

const app = new App(process.argv);

new RootStack(app, `${ENV_TYPE}-${PROJECT_NAME}`, comProps);

process.stdout.write(app.run());
