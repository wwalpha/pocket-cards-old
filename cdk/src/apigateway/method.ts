import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/cdk";
import { MethodProps } from ".";
import { UUID_V4 } from "../utils/consts";

export default (parent: Construct, props: MethodProps) => new Method(
  parent,
  `Method${UUID_V4}`,
  {
    httpMethod: props.method,
    resource: props.resource,
  },
);
