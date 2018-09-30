import { Construct } from "@aws-cdk/cdk";
import { Code, FunctionRef } from "@aws-cdk/aws-lambda";
import { BucketRef } from "@aws-cdk/aws-s3";
import { PROJECT_NAME, UUID_V4 } from "./consts";

export const dummyCode = (parent: Construct) => Code.bucket(BucketRef.import(parent, `Bucket${UUID_V4()}`,
  {
    bucketArn: 'arn:aws:s3:::deployment-projects',
  }),
  `${PROJECT_NAME}/dummy.zip`
);

/** LambdaのRef */
export const functionRef = (parent: Construct, functionArn: string) => FunctionRef.import(parent, `Function${UUID_V4}`,
  {
    functionArn,
  }
);