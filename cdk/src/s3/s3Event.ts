import { Construct } from '@aws-cdk/cdk';
import { EventType, NotificationKeyFilter } from '@aws-cdk/aws-s3';
import { BucketNotificationDestinationProps, BucketNotificationDestinationType } from '@aws-cdk/aws-s3-notifications';
import { S3EventInput, S3EventOutput } from '.';

export default (_parent: Construct, props: S3EventInput): S3EventOutput => {

  addEvent(props, 'image-to-word');

  return {};
};

const addEvent = (props: S3EventInput, lambdaName: string, ...filters: NotificationKeyFilter[]): void => {
  props.bucket.onEvent(
    EventType.ObjectCreated,
    {
      asBucketNotificationDestination(_bucketArn: string, _bucketId: string) {
        const ret: BucketNotificationDestinationProps = {
          arn: props.lambdaArn[lambdaName],
          type: BucketNotificationDestinationType.Lambda,
        };
        return ret;
      }
    },
    ...filters);
}
