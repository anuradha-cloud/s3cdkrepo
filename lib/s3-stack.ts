import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'; // import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyS3CdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // 👇 Create an S3 Bucket
    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Deletes bucket on stack destroy (for dev only!)
      autoDeleteObjects: true,
    });
  }
}
