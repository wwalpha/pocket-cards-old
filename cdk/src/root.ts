import { Stack, App, StackProps, Output, AwsAccountId, AwsRegion, AwsStackId, AwsStackName } from '@aws-cdk/cdk';
import { Cognito, AppSync, Dynamodb, S3, CodeBuild, Lambda, S3Event } from '.';
import { CommonProps } from './common';

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
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

    const comProps: CommonProps = {
      envType: 'dev',
    };

    // Cognito
    const cognito = Cognito(this, comProps);
    // S3
    const s3 = S3(this, comProps);
    // All Lambda
    const lambda = Lambda(this, {
      ...comProps,
      bucket: s3,
    });
    // S3 Event
    S3Event(this, {
      ...comProps,
      bucket: s3,
    });

    // DynamoDB
    Dynamodb(this, comProps);

    // AppSync
    const appsync = AppSync(this, {
      ...comProps,
      cognito,
      lambda,
    });

    // CloudFront(this, {
    //   bucketArn: s3.arn,
    //   bucketDomainName: s3.domainName,
    //   bucketRef: s3.ref,
    //   envType: 'dev',
    // });

    // CodeBuild
    CodeBuild(this, comProps);

    new Output(this, 'BucketArn', {
      export: 'BucketArn',
      value: s3.bucketArn,
    });
    // new Output(this, 'BucketDomainName', {
    //   export: 'BucketDomainName',
    //   value: s3.bucket.domainName,
    // });

    // Cognito
    new Output(this, 'UserPoolId', {
      export: 'UserPoolId',
      value: cognito.userPoolId
    });
    new Output(this, 'UserPoolWebClientId', {
      export: 'UserPoolWebClientId',
      value: cognito.userPoolClientId
    });
    new Output(this, 'IdentityPoolId', {
      export: 'IdentityPoolId',
      value: cognito.identityPoolId
    });

    // Appsync
    new Output(this, 'AppsyncApiId', {
      export: 'AppsyncApiId',
      value: appsync.apiId,
    });
    new Output(this, 'AppsyncApiUrl', {
      export: 'AppsyncApiUrl',
      value: appsync.apiUrl,
    });
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());
