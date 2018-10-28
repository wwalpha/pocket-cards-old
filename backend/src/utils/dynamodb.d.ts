import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";

export declare function scan<T>(db: DocumentClient, table: string, startKey?: Key): Promise<T[]>;
