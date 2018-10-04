import { Stack, App, Output } from "@aws-cdk/cdk";
import { S3Input, NewBucket, S3Output } from ".";
import { PROJECT_NAME } from "../utils/consts";

export default class S3Stack extends Stack {
  public readonly output: S3Output

  constructor(parent: App, name: string, props: S3Input) {
    super(parent, name, props);

    const bucket = NewBucket(this, props);

    this.output = {
      bucket: bucket.export(),
      domainName: bucket.domainName,
    };

    new Output(this, 'BucketName', {
      export: `${props.env}-${PROJECT_NAME}-BucketName`,
      value: bucket.bucketName,
    });
    new Output(this, 'BucketArn', {
      export: `${props.env}-${PROJECT_NAME}-BucketArn`,
      value: bucket.bucketArn,
    });
    new Output(this, 'DomainName', {
      export: `${props.env}-${PROJECT_NAME}-DomainName`,
      value: bucket.domainName,
    });
  }
}
