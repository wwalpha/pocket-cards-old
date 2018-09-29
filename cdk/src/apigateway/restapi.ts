import { RestApi, EndpointType } from '@aws-cdk/aws-apigateway';
import { Construct } from "@aws-cdk/cdk";
import { PROJECT_NAME } from "../utils/consts";
import { ApiGatewayInput } from ".";

export default (parent: Construct, props: ApiGatewayInput) => new RestApi(
  parent,
  'ApiGatewayResource',
  {
    restApiName: `${props.envType}-${PROJECT_NAME}-api`,
    endpointTypes: [
      EndpointType.Regional,
    ]
  },
);
