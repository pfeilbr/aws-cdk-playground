const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const sqs = require("@aws-cdk/aws-sqs");
const { SqsEventSource } = require("@aws-cdk/aws-lambda-event-sources");

const createInlineNodejsLambda = (parent, name, code) => {
  return new lambda.Function(parent, name, {
    runtime: lambda.Runtime.NODEJS_12_X,
    handler: "index.handler",
    code: lambda.Code.fromInline(code),
  });
};

class ApigSqsLambdaCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const handler = createInlineNodejsLambda(
      this,
      "MyFn",
      `
      exports.handler = async (event, context) => {
        console.log(JSON.stringify(event, null, 2))

        const body = {event, env: process.env}

        return {
          statusCode: 200,
            headers: {},
            body: JSON.stringify(body, null, 2)
        }
      }
    `
    );

    // https://sbstjn.com/blog/aws-cdk-api-gateway-service-integration-sqs/
    // APIG (GET) -> SQS -> lambda
    const api = new apigateway.RestApi(this, "my-api", {
      restApiName: "My Service",
      description: "This service serves.",
    });

    const myIntegration = new apigateway.LambdaIntegration(handler);

    api.root.addMethod("GET", myIntegration);

    const messageQueue = new sqs.Queue(this, "Queue");

    const credentialsRole = new iam.Role(this, "Role", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });

    credentialsRole.attachInlinePolicy(
      new iam.Policy(this, "SendMessagePolicy", {
        statements: [
          new iam.PolicyStatement({
            actions: ["sqs:SendMessage"],
            effect: iam.Effect.ALLOW,
            resources: [messageQueue.queueArn],
          }),
        ],
      })
    );

    const queue = api.root.addResource("queue");
    handler.addEventSource(new SqsEventSource(messageQueue));
    queue.addMethod(
      "GET",
      new apigateway.AwsIntegration({
        service: "sqs",
        path: `${cdk.Aws.ACCOUNT_ID}/${messageQueue.queueName}`,
        integrationHttpMethod: "POST",
        options: {
          credentialsRole,
          passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
          requestParameters: {
            "integration.request.header.Content-Type": `'application/x-www-form-urlencoded'`,
          },
          requestTemplates: {
            "application/json": `Action=SendMessage&MessageBody=$util.urlEncode("$method.request.querystring.message")`,
          },
          integrationResponses: [
            {
              statusCode: "200",
              responseTemplates: {
                "application/json": `{"done": true}`,
              },
            },
          ],
        },
      }),
      { methodResponses: [{ statusCode: "200" }] }
    );
  }
}

module.exports = { ApigSqsLambdaCdkStack };
