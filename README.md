# AWS CDK Project - S3 Bucket with Lambda to List Files

This project demonstrates how to use AWS CDK to:
- Create an S3 bucket.
- Upload dummy files to the bucket.
- Deploy a Node.js Lambda function that lists all files in the bucket.

## 📦 Project Overview
I created an S3 bucket using AWS CDK.
Uploaded dummy files to the S3 bucket through CDK's BucketDeployment.
Developed a Node.js Lambda function that lists the files in the S3 bucket.
Deployed the Lambda function using AWS CDK and granted it permission to access the bucket.
I tested the Lambda function inside AWS Console by invoking it to confirm that it lists the bucket files.
I also resolved common deployment issues (like .gitignore exclusions and missing modules) and now the entire working project is available in my GitHub repo.

## 📂 Project Structure:
my-s3-cdk-project/
│
├── dummy-files/ → Folder with dummy files uploaded to S3
│
├── lambda/ → Lambda function source code
│ └── index.js → Lists all files in the S3 bucket
│
├── lib/
│ └── my-s3-cdk-project-stack.ts → CDK stack with S3 + Lambda definitions
│
├── .gitignore
├── README.md → Project Documentation
├── cdk.json
├── package.json
└── tsconfig.json
