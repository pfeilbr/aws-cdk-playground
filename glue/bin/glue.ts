#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { GlueStack } from '../lib/glue-stack';

const app = new cdk.App();
new GlueStack(app, 'GlueStack');
