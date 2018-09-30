import { Stack, App } from "@aws-cdk/cdk";
import { S3Input, NewBucket, S3Output } from ".";

export default class S3Stack extends Stack {
  public readonly output: S3Output

  constructor(parent: App, name: string, props: S3Input) {
    super(parent, name, props);

    const bucket = NewBucket(this, props);

    this.output = {
      bucket: bucket.export(),
      domainName: bucket.domainName,
    }
  }
}
