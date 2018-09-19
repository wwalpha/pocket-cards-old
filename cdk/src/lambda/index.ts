import { Token, Construct } from '@aws-cdk/cdk';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export default (parent: Construct, props: any, apiId: Token) => {
  const config: any = yaml.safeLoad(fs.readFileSync('./sam.yml', 'utf8'));

  config.Resources.forEach((item: any) => {
    const props: SAM = (item.Properties as SAM);


  });
};

interface SAM {
  CodeUri: string;
  Handler: string;
  Runtime: Runtime;
  FunctionName: string;
  Role: string;
  MemorySize: number;
  Timeout: number;
  Environment: {
    [key: string]: any;
  };
}
