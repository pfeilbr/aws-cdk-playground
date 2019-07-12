import cdk = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import kinesis = require("@aws-cdk/aws-kinesis");
import { KinesisEventSource } from "@aws-cdk/aws-lambda-event-sources";
import fs = require("fs");

export class ApigLambdaKinesisLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, "MySteam");

    const apilambdaFn = new lambda.Function(this, "APIHandler", {
      code: new lambda.AssetCode("lambdas"),
      handler: "api.handler",
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        STREAM_NAME: stream.streamName
      }
    });

    stream.grantWrite(apilambdaFn);

    const streamlambdaFn = new lambda.Function(this, "StreamHandler", {
      code: new lambda.AssetCode("lambdas"),
      handler: "stream.handler",
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_10_X
    });

    streamlambdaFn.addEventSource(
      new KinesisEventSource(stream, {
        batchSize: 1, // default
        startingPosition: lambda.StartingPosition.LATEST
      })
    );

    const api = new apigateway.RestApi(this, "service01", {
      restApiName: "service01"
    });

    const items = api.root.addResource("service01");
    // const getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
    // items.addMethod('GET', getAllIntegration);

    const apilambdaFnIntegration = new apigateway.LambdaIntegration(
      apilambdaFn
    );
    items.addMethod("POST", apilambdaFnIntegration);
    //addCorsOptions(items);
  }
}
