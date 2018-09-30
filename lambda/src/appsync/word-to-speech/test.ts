import { handler, Request } from './app';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { join } from 'path';

const callback: any = (err, result) => console.log(err, result);
const context: any = {};

handler(safeLoad(readFileSync(join(__dirname, 'test.yml'), 'utf-8')) as Request, context, callback);

console.log(callback);
