import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/cdk";
import * as uuid from 'uuid';
import { MethodProps } from ".";

export default (parent: Construct, props: MethodProps) => new Method(
  parent,
  `Method${uuid.v4()}`,
  {
    httpMethod: props.method,
    resource: props.resource,
  },
);
