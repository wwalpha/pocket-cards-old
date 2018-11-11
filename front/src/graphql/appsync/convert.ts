import * as mutations from './gql/mutations';
import * as queries from './gql/queries';
import * as fs from 'fs';
import * as path from 'path';

const toUpper = (v: string) => v.split('').map((c) => {
  if (c === c.toUpperCase()) {
    return `_${c}`;
  }

  return c.toUpperCase();
}).join('');

const output = [] as string[];
output.push('import gql from \'graphql-tag\';\n');
output.push('// this is an auto generated file. This will be overwritten\n');

Object.keys(mutations).forEach((key) => {
  output.push(`export const GQL_${toUpper(key)} = gql\`\n${(mutations as Map)[key]}\`;\n`);
});

fs.writeFileSync(path.join(__dirname, 'mutations.ts'), output.join('\n'));

// queries
output.length = 0;
output.push('import gql from \'graphql-tag\';\n');
output.push('// this is an auto generated file. This will be overwritten\n');

Object.keys(queries).forEach((key) => {
  output.push(`export const GQL_${toUpper(key)} = gql\`\n${(queries as Map)[key]}\`;\n`);
});

fs.writeFileSync(path.join(__dirname, 'queries.ts'), output.join('\n'));

export interface Map {
  [key: string]: string;
}
