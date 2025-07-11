# AWS CDK Project: S3 Bucket + Lambda + ECS Fargate (Dockerized Node.js App)

## 📋 Project Overview

This project demonstrates the use of AWS CDK (Cloud Development Kit) to deploy:
- An S3 bucket with dummy files.
- A Lambda function that lists the files in the S3 bucket.
- An ECS Fargate Task running a Dockerized Node.js app that also lists files from the S3 bucket.

All infrastructure is fully automated via CDK (TypeScript).

## 📦 Project Components

### 1. S3 Bucket
- Stores dummy files.
- Automatically deploys dummy files using `aws-s3-deployment` in CDK.

### 2. Lambda Function (Node.js)
- Reads file list from the S3 bucket.
- Logs output to CloudWatch Logs.
- Deployed via CDK inside `/lambda` folder.

### 3. ECS Fargate Task (Dockerized Node.js App)
- Dockerized Node.js app placed inside `/ecs-app`.
- Connects to the same S3 bucket using `@aws-sdk/client-s3`.
- Logs output to CloudWatch Logs.
- Deployed via CDK with Fargate launch type (Serverless containers).

---

## 🗂️ Project Structure
my-s3-cdk-project/
│
├── ecs-app/ ← Dockerized Node.js app for ECS Fargate
│ ├── Dockerfile
│ ├── index.js ← Lists files from S3 bucket
│ ├── package.json
│ └── ...
│
├── lambda/ ← Lambda function to list S3 files
│ └── index.js
│
├── dummy-files/ ← Dummy files to upload to S3
│
├── lib/
│ └── s3-stack.ts ← CDK stack with S3 + Lambda + ECS Fargate setup
│
├── bin/
│ └── my-s3-cdk-project.ts ← CDK app entry point
│
├── test/ ← CDK tests
│
├── cdk.json ← CDK configuration
├── package.json ← CDK project dependencies
├── README.md ← Project documentation
└── tsconfig.json ← TypeScript config
