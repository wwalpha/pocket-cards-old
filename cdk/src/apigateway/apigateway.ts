import { Construct } from "@aws-cdk/cdk";
import { AuthorizationType, LambdaIntegration } from "@aws-cdk/aws-apigateway";
import { RestApi, ApiGatewayInput, ApiGatewayOutput } from ".";
import { HttpMethod } from "../utils/consts";
import { functionRef } from "../utils/refs";

export default (parent: Construct, props: ApiGatewayInput): ApiGatewayOutput => {
  const api = RestApi(parent, props);

  const upload = api.root.addResource('upload');

  upload.addMethod(HttpMethod.POST, new LambdaIntegration(functionRef(parent, props.lambda['ImageToWord'])), {
    authorizationType: AuthorizationType.IAM,
  });

  return {}
}