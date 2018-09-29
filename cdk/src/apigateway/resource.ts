import { Resource } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/cdk";
import * as uuid from 'uuid';
import { ResourceProps } from ".";

export default (parent: Construct, props: ResourceProps) => new Resource(
  parent,
  `Resource${uuid.v4()}`,
  {
    pathPart: props.pathPart,
    parent: props.resouce,
  },
);
