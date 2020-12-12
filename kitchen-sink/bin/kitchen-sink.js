#!/usr/bin/env node

const cdk = require("@aws-cdk/core");
const { KitchenSinkCdkStack } = require("../lib/kitchen-sink-stack");
const { ApigSqsLambdaCdkStack } = require("../lib/apig-sqs-lambda-stack");

const app = new cdk.App();
new KitchenSinkCdkStack(app, "KitchenSinkCdkStack");
new ApigSqsLambdaCdkStack(app, "ApigSqsLambdaCdkStack");
