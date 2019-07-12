# apig-lambda-kinesis-lambda

provisions the following pipeline

API Gateway -> lambda -> kinesis steam -> lambda

lambda code is in [`lambda`](lambda) directory

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
