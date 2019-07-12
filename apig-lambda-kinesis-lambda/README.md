# apig-lambda-kinesis-lambda

provisions the following pipeline

API Gateway -> lambda -> kinesis steam -> lambda

lambda code is in [`lambda`](lambda) directory

## Deploy and Run

```sh
npm run build
cdk deploy
# make note of the api gateway endpoint in "Outputs:" section

# test api gateway endpoint
curl -d '{"itemId": "0", "msg": "hello"}' https://<API GATEWAY ENDPOINT>/prod/service01
# check cloudwatch logs for stream handler lambda
```

**example cloudwatch log for stream handler function**

![](https://www.evernote.com/l/AAFDu2TDI4FP-418SfdaRM1d63jwAKHo5osB/image.png)

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
