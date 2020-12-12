# kitchen-sink

## `lib/apig-sqs-lambda-stack.js`

API Gateway service integration example

`APIG (GET /queue?message=hello) -> SQS -> lambda`
## scratch

```sh
# synth stack
cdk synth ApigSqsLambdaCdkStack

# deploy specific stack
cdk deploy ApigSqsLambdaCdkStack --force --require-approval never

# deploy all stacks that are part of the app
cdk deploy --all --force --require-approval never

# add message to SQS queue
curl https://42ssa6ovnl.execute-api.us-east-1.amazonaws.com/prod/queue?message=hello
```


## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template
