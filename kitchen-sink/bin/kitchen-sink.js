#!/usr/bin/env node

const cdk = require("@aws-cdk/core");
const { KitchenSinkCdkStack } = require("../lib/kitchen-sink-stack");
const { ApigSqsLambdaCdkStack } = require("../lib/apig-sqs-lambda-stack");
const {
  CloudFrontS3WebsiteCdkStack,
} = require("../lib/cloudfront-s3-website-stack");
const { AppSyncLambdaCdkStack } = require("../lib/appsync-lambda-stack");

const app = new cdk.App();
new KitchenSinkCdkStack(app, "KitchenSinkCdkStack");
new ApigSqsLambdaCdkStack(app, "ApigSqsLambdaCdkStack");
new CloudFrontS3WebsiteCdkStack(app, "CloudFrontS3WebsiteCdkStack");
new AppSyncLambdaCdkStack(app, "AppSyncLambdaCdkStack");
