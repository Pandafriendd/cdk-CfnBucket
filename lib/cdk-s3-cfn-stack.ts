import * as cdk from '@aws-cdk/core';
import * as iam from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";

export class CdkS3CfnStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // RESOURCES

    const replicaBucket = new s3.Bucket(this, "ReplicaBucket", {
      versioned: true,
    });

    const role = new iam.Role(this, "ReplicaRole", {
      assumedBy: new iam.ServicePrincipal("s3"),
    });

    const realBucket = new s3.CfnBucket(this, "RealBucket", {
      replicationConfiguration: {
        role: role.roleArn,
        rules: [
          {
            destination: {
              bucket: replicaBucket.bucketArn
            },
            status: "Enabled",
          },
        ],
      },
      objectLockConfiguration: {
        objectLockEnabled: 'Enabled',
        rule: {
          defaultRetention: {
            days: 365
          }
        }
      },
      objectLockEnabled: true,
    }
    );
  }
}
