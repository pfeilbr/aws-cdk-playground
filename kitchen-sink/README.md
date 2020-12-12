# kitchen-sink

## `lib/apig-sqs-lambda-stack.js`

API Gateway service integration example

`APIG (GET /queue?message=hello) -> SQS -> lambda`
## scratch

```sh

# list stacks in app
cdk list

# synth stack
cdk synth ApigSqsLambdaCdkStack

# synth stack and send cfn output to vscode to view
cdk synth ApigSqsLambdaCdkStack | code -

# deploy specific stack
cdk deploy ApigSqsLambdaCdkStack --force --require-approval never

# add message to SQS queue
curl https://42ssa6ovnl.execute-api.us-east-1.amazonaws.com/prod/queue?message=hello

# deploy cloudfront + S3 website
cdk deploy CloudFrontS3WebsiteCdkStack --force --require-approval never

# appsync with lambda datasource
cdk deploy AppSyncLambdaCdkStack --force --require-approval never

# fetch all notes via graphql endpoint
curl --request POST --header "x-api-key: da2-yww7727445c63gkhjihcua2ioa" \
--header "Content-Type: application/graphql"  \
--data '{"query": "query MyQuery { notes }"}' \
https://vrs44qbp3fenfh4iq3dtvli7li.appsync-api.us-east-1.amazonaws.com/graphql

# output: {"data":{"notes":["note1","note2","note3"]}}

# deploy all stacks that are part of the app
cdk deploy --all --force --require-approval never


cdk destroy
```


## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template
