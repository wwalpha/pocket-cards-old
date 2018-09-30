import { Construct, } from '@aws-cdk/cdk';
import { Runtime, Function } from '@aws-cdk/aws-lambda';
import { s3 } from '../utils/policy';
import { PROJECT_NAME, bucketName } from '../utils/consts';
import { getHandler, LambdaInput } from '.';
import { dummyCode } from '../utils/refs';
import { LambdaRole } from '../utils/roles';

const functionName = 'add-new-words';
const handler = 'app.handler';
const runtime = Runtime.NodeJS810;
const memorySize = 256;
const timeout = 10;

export default (parent: Construct, props: LambdaInput): Function => {
  const role = LambdaRole(parent, {
    envType: props.envType,
    roleName: `${functionName}Role`,
  });

  role.attachInlinePolicy(s3(parent, `${functionName}Role`, bucketName(props.envType)));

  return new Function(parent, functionName, {
    functionName: `${props.envType}-${PROJECT_NAME}-${functionName}`,
    runtime,
    handler: getHandler(props, functionName, handler),
    code: dummyCode(parent),
    role,
    memorySize,
    timeout,
    environment: {
      S3_BUCKET: props.s3.bucket.bucketName,
    },
  });
};
