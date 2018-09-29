import { Construct, ServicePrincipal } from '@aws-cdk/cdk';
import { Runtime, Function } from '@aws-cdk/aws-lambda';
import { Role, Policy } from '@aws-cdk/aws-iam';
import { lambdaBasic, lambdaS3 } from '../utils/policyStmt';
import { PROJECT_NAME } from '../utils/consts';
import { getHandler, LambdaInput } from '.';
import { dummyCode } from '../utils/refs';

const functionName = 'add-new-words';
const handler = 'app.handler';
const runtime = Runtime.NodeJS810;
const memorySize = 256;
const timeout = 10;

export default (parent: Construct, props: LambdaInput): Function => {
  const role = new Role(parent, `${functionName}Role`, {
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    roleName: `${props.envType}-${PROJECT_NAME}-${toUpper(functionName)}Role`,
  });

  role.attachInlinePolicy(new Policy(parent, `${toUpper(functionName)}Policy`, {
    statements: [
      lambdaBasic(),
      ...lambdaS3(),
    ],
  }));

  return new Function(parent, `${functionName}Resource`, {
    functionName: `${props.envType}-${PROJECT_NAME}-${functionName}`,
    runtime,
    handler: getHandler(props, functionName, handler),
    code: dummyCode(parent),
    role,
    memorySize,
    timeout,
    environment: {
      S3_BUCKET: props.bucket.bucketName,
    },
  });
};

const toUpper = (value: string) => value.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('');
