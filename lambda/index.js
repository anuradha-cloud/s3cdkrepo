const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const s3 = new S3Client();

exports.handler = async () => {
  const bucketName = process.env.BUCKET_NAME;

  const command = new ListObjectsV2Command({ Bucket: bucketName });

  try {
    const data = await s3.send(command);
    console.log("Files in bucket:");
    data.Contents.forEach((item) => {
      console.log(item.Key);
    });
  } catch (err) {
    console.error("Error listing files:", err);
  }
};
