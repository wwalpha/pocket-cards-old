import { Construct } from '@aws-cdk/cdk';
import { CommonProps } from '../common';
import { Bucket } from '.';

export default (parent: Construct, props: S3Input): S3Output => {

  // バケット
  const bucket = Bucket(parent, props);

  const ret: S3Output = {
    domainName: bucket.domainName,
    bucketArn: bucket.bucketArn,
    bucketName: bucket.bucketName,
  };

  return ret;
};

export interface S3Input extends CommonProps {
}

export interface S3Output {
  domainName: string;
  bucketArn: string;
  bucketName: string;
}
