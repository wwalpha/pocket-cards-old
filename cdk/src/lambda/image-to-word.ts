import { Construct, ServicePrincipal, AwsAccountId } from '@aws-cdk/cdk';
import { Runtime, Function } from '@aws-cdk/aws-lambda';
import { s3 } from '../utils/policy';
import { PROJECT_NAME, bucketName } from '../utils/consts';
import { getHandler, LambdaInput } from '.';
import { dummyCode } from '../utils/refs';
import { LambdaRole } from '../utils/roles';

const service = 'appsync';
const functionName = 'image-to-word';
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

  const lambda = new Function(parent, functionName, {
    functionName: `${props.envType}-${PROJECT_NAME}-${functionName}`,
    runtime,
    handler: getHandler(props, `${service}/${functionName}`, handler),
    code: dummyCode(parent),
    role,
    memorySize,
    timeout,
    environment: {
      S3_BUCKET: bucketName(props.envType),
    },
  });

  lambda.addPermission('imageToWordInvoke', {
    principal: new ServicePrincipal('s3.amazonaws.com'),
    sourceAccount: `${new AwsAccountId()}`,
    sourceArn: props.s3.bucket.bucketArn,
  });

  return lambda;
};
