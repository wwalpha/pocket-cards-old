import { Construct } from '@aws-cdk/cdk';
import { CommonProps } from '../common';
import { UserInfo } from '.';

export default (parent: Construct, props: DynamodbInput): DynamodbOutput => {

  // ユーザ情報
  UserInfo(parent, props);

  return {};
};

export interface DynamodbInput extends CommonProps {
}

export interface DynamodbOutput {
}
