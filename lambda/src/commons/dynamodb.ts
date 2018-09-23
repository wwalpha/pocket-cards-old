import { DynamoDB, AWSError } from "aws-sdk";

export const putItem = (client: DynamoDB.DocumentClient, request: DynamoDB.DocumentClient.PutItemInput) =>
  new Promise<DynamoDB.DocumentClient.PutItemOutput>((resolve, reject) => {
    client.put(request, (err: AWSError, data: DynamoDB.DocumentClient.PutItemOutput) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  })