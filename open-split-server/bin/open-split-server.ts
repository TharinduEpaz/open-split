#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { OpenSplitServerStack } from '../lib/open-split-server-stack';

const app = new cdk.App();
new OpenSplitServerStack(app, 'OpenSplitServerStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
