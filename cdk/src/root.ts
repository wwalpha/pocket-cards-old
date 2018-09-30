import { Stack, App, AwsAccountId, AwsRegion, AwsStackId, AwsStackName } from '@aws-cdk/cdk';
import { CognitoStack, S3Stack, LambdaStack, DynamodbStack } from '.';
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
    const lambda = new LambdaStack(parent, `${name}-Lambda`, {
      ...comProps,
      s3: s3.output,
    });

    new CognitoStack(parent, `${name}-Cognito`, {
      ...comProps,
      lambda: lambda.output,
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

    // new Output(this, 'BucketArn', {
    //   export: 'BucketArn',
    //   value: s3.bucketArn,
    // });
    // new Output(this, 'BucketDomainName', {
    //   export: 'BucketDomainName',
    //   value: s3.bucket.domainName,
    // });

    // Appsync
    // new Output(this, 'AppsyncApiId', {
    //   export: 'AppsyncApiId',
    //   value: appsync.apiId,
    // });
    // new Output(this, 'AppsyncApiUrl', {
    //   export: 'AppsyncApiUrl',
    //   value: appsync.apiUrl,
    // });
  }
}
const ENV_TYPE = 'dev';
const comProps: CommonProps = {
  envType: ENV_TYPE,
};

const app = new App(process.argv);

new RootStack(app, `${ENV_TYPE}-${PROJECT_NAME}`, comProps);

process.stdout.write(app.run());
