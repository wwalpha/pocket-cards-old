import { S3EventInput, S3EventOutput } from '.';
import { cloudformation } from '@aws-cdk/aws-s3';
import { Construct, AwsRegion, AwsAccountId } from '@aws-cdk/cdk';
import { PROJECT_NAME } from '../utils/consts';

export default (_parent: Construct, props: S3EventInput): S3EventOutput => {
  const prefixArn = `arn:aws:lambda:${new AwsRegion()}:${new AwsAccountId()}:function:${props.envType}-${PROJECT_NAME}`;
  // イベント
  addCreatedEvent(props.bucket.bucket, `${prefixArn}-image-to-word`, {
    name: 'prefix',
    value: 'users'
  });


  return {};
};

const addCreatedEvent = (bucket: cloudformation.BucketResource, lambdaArn: string, ...rules: cloudformation.BucketResource.FilterRuleProperty[]): void => {
  bucket.propertyOverrides.notificationConfiguration = {
    lambdaConfigurations: [
      {
        event: 's3:ObjectCreated:*',
        function: lambdaArn,
        filter: {
          s3Key: {
            rules: rules
          }
        }
      }
    ]
  };
}
