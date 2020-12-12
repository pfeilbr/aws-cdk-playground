const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
const s3 = require("@aws-cdk/aws-s3");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const secretsmanager = require("@aws-cdk/aws-secretsmanager");
const sqs = require("@aws-cdk/aws-sqs");
const { SqsEventSource } = require("@aws-cdk/aws-lambda-event-sources");

const createInlineNodejsLambda = (parent, name, code) => {
  return new lambda.Function(parent, name, {
    runtime: lambda.Runtime.NODEJS_12_X,
    handler: "index.handler",
    code: lambda.Code.fromInline(code),
  });
};

class KitchenSinkCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const credentialsSecret = new secretsmanager.Secret(
      this,
      "credentialsSecret",
      {
        secretName: `${id}`,
        description: "credentials",
        generateSecretString: {
          generateStringKey: "PASSWORD",
          secretStringTemplate: JSON.stringify({
            USERNAME: "myUsername",
            URL: "myURL",
          }),
        },
      }
    );

    const bucket = new s3.Bucket(this, "MyFirstBucket", {
      versioned: true,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

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
    handler.addEnvironment("BUCKET_NAME", bucket.bucketName);
    handler.addEnvironment(
      "CREDENTIALS_SECRET_ARN",
      credentialsSecret.secretArn
    );
    bucket.grantReadWrite(handler);
    credentialsSecret.grantRead(handler);

    const api = new apigateway.RestApi(this, "my-api", {
      restApiName: "My Service",
      description: "This service serves.",
    });

    const myIntegration = new apigateway.LambdaIntegration(handler);

    api.root.addMethod("GET", myIntegration);
  }
}

module.exports = { KitchenSinkCdkStack };
