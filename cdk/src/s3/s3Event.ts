import { Construct } from '@aws-cdk/cdk';
import { S3EventInput, S3EventOutput } from '.';
import { NotificationKeyFilter } from '@aws-cdk/aws-s3';
import { Function } from '@aws-cdk/aws-lambda';

export default (_parent: Construct, props: S3EventInput): S3EventOutput => {
  // イベント
  addCreatedEvent(props, props.lambda['image-to-words']);

  return {};
};

// 
const addCreatedEvent = (props: S3EventInput, lambda: Function, ...filters: NotificationKeyFilter[]): void => {
  props.bucket.onObjectCreated(lambda, ...filters);
}
