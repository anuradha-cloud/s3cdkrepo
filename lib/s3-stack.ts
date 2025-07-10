import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class MyS3CdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create S3 bucket
    const bucket = new s3.Bucket(this, 'MyFirstBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. Deploy dummy files to S3
    new s3deploy.BucketDeployment(this, 'DeployDummyFiles', {
      sources: [s3deploy.Source.asset('./dummy-files')],
      destinationBucket: bucket,
    });

    // 3. Create Lambda function
  const lambdaFn = new lambda.Function(this, 'ListFilesLambda', {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),  // folder where your index.js is placed
  environment: {
    BUCKET_NAME: bucket.bucketName,
    DUMMY: new Date().toISOString() 
  },
});

    // 4. Grant Lambda permission to read S3 bucket
    bucket.grantRead(lambdaFn);
  }
}

