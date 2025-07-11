import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';

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
        DUMMY: new Date().toISOString(),
      },
    });

    // 4. Grant Lambda permission to read S3 bucket
    bucket.grantRead(lambdaFn);

    // NEW CODE: ECS Fargate Resources

    // 5. Create VPC (You can reuse or customize this later)
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,  // You can adjust AZs if needed
    });

    // 6. Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc,
    });

    // 7. Build Docker image from local folder "ecs-app"
    const dockerImageAsset = new ecr_assets.DockerImageAsset(this, 'EcsDockerImage', {
      directory: 'ecs-app',  // Folder where your Dockerfile and app are present
    });

    // 8. Create Fargate Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyFargateTask', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // 9. Add container to task definition
    taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromDockerImageAsset(dockerImageAsset),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'ecs-s3-app' }),
      environment: {
        BUCKET_NAME: bucket.bucketName,
        AWS_REGION: this.region,  // Uses region dynamically from stack
      },
    });

    // 10. Grant S3 Read Access to Fargate Task Role
    bucket.grantRead(taskDefinition.taskRole);

    // 11. Create Fargate Service (runs your task)
    new ecs.FargateService(this, 'MyFargateService', {
      cluster,
      taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,  // Needed for ECR pull & internet access
    });
  }
}
