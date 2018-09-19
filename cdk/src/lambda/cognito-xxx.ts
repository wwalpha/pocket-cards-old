import { Construct } from '@aws-cdk/cdk';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { CommonProps } from '../common';
import { PROJECT_NAME } from '../common/consts';

export default (parent: Construct, props: LambdaInput): LambdaOutput => {
  const config: any = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

  // tslint:disable-next-line:no-function-constructor-with-string-args
  new Function(parent, 'cognito-xxx', {
    functionName: `${props.envType}-${props.envType}-cognito-xxx`,
    runtime: Runtime.NodeJS810,
    handler: 'index.handle',
    code: Code.directory('111'),
    memorySize: 1024,
    timeout: 15,

  });

  return {};
};

export interface LambdaInput extends CommonProps {
}

export interface LambdaOutput {
}
