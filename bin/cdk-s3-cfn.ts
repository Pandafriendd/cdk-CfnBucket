#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkS3CfnStack } from '../lib/cdk-s3-cfn-stack';

const app = new cdk.App();
new CdkS3CfnStack(app, 'CdkS3CfnStack');
