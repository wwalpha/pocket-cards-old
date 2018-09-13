import { Construct } from '@aws-cdk/cdk';
import { PROJECT_NAME } from '../common/consts';
import { cloudformation } from '@aws-cdk/aws-s3';
import { S3Input } from './s3';

export default (parent: Construct, props: S3Input) => new cloudformation.BucketResource(
  parent,
  'BucketResource',
  {
    bucketName: `${props.envType}-${PROJECT_NAME.toLowerCase()}`,
    versioningConfiguration: {
      status: 'Enabled',
    },
    bucketEncryption: {
      serverSideEncryptionConfiguration: [{
        serverSideEncryptionByDefault: {
          sseAlgorithm: 'AES256',
        },
      }],
    },
  },
);
