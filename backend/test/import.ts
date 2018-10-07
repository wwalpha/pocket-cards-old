import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { join } from 'path';
import { DynamoDB } from 'aws-sdk';

const filepath = process.argv[2];
const tableName = process.env.TABLE_NAME as string;

const words = safeLoad(readFileSync(join(__dirname, `${filepath}/data.yml`), 'utf-8')) as any[];

const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const put = async () => {

  try {
    for (const idx in words) {
      const word = words[idx];

      await client.put({
        TableName: tableName,
        Item: word,
      }).promise();

    }
  } catch (error) {
    console.log(error);
  }
};

put();
