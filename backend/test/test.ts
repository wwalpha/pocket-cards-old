import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { join } from 'path';

const callback: any = (err, result) => {
};

const context: any = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'dummy',
  functionVersion: 'dummy',
  invokedFunctionArn: 'dummy',
  memoryLimitInMB: 1024,
  awsRequestId: 'dummy',
  logGroupName: 'dummy',
  logStreamName: 'dummy',
};

const appfile = `../src/${process.argv[2]}/app.ts`;
const filepath = process.argv[2];

const app = require(appfile);

const event = safeLoad(readFileSync(join(__dirname, `${filepath}/event.yml`), 'utf-8'));

app.handler(event as any, context, callback);
