#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ApigLambdaKinesisLambdaStack } from '../lib/apig-lambda-kinesis-lambda-stack';

const app = new cdk.App();
new ApigLambdaKinesisLambdaStack(app, 'ApigLambdaKinesisLambdaStack');
