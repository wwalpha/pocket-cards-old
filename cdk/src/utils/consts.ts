import * as uuid from 'uuid';

export const PROJECT_NAME = 'PocketCards';

export const HttpMethod = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
}

export const bucketName = (env: string) => `${env}-${PROJECT_NAME.toLowerCase()}`;

export const UUID_V4 = (): string => `aws${uuid.v4()}`;