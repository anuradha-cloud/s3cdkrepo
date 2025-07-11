const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new S3Client({ region: REGION });

async function listFiles() {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const data = await s3.send(command);

    if (data.Contents) {
      console.log("Files in bucket:");
      data.Contents.forEach(item => console.log(item.Key));
    } else {
      console.log("Bucket is empty.");
    }
  } catch (err) {
    console.error("Error listing files:", err);
  }
}

listFiles();
