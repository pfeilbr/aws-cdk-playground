const cdk = require("@aws-cdk/core");
const path = require("path");
const lambda = require("@aws-cdk/aws-lambda");
const appsync = require("@aws-cdk/aws-appsync");

class AppSyncLambdaCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: "cdk-api",
      schema: appsync.Schema.fromAsset(
        path.join(
          __dirname,
          "../assets/appsync-lambda-stack/graphql/schema.gql"
        )
      ), ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, ///Defining Authorization Type
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)), ///set expiration for API Key
          },
        },
      },
      xrayEnabled: true, ///Enables xray debugging
    });

    ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl,
    });

    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    ///Lambda Fucntion
    const lambda_function = new lambda.Function(this, "LambdaFunction", {
      runtime: lambda.Runtime.NODEJS_12_X, ///set nodejs runtime environment
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../assets/appsync-lambda-stack/lambda")
      ), ///path for lambda function directory
      handler: "index.handler", ///specfic fucntion in specific file
      timeout: cdk.Duration.seconds(10), ///Time for function to break. limit upto 15 mins
    });

    ////Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource(
      "lambdaDataSource",
      lambda_function
    );

    ///Describing resolver for datasource
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "notes",
    });

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "customNote",
    });
  }
}

module.exports = { AppSyncLambdaCdkStack };
