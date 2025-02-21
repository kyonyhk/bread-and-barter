import { S3Client } from '@aws-sdk/client-s3';

if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error('AWS_ACCESS_KEY_ID is required');
if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error('AWS_SECRET_ACCESS_KEY is required');
if (!process.env.AWS_REGION) throw new Error('AWS_REGION is required');
if (!process.env.AWS_BUCKET_NAME)
  throw new Error('AWS_BUCKET_NAME is required');

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
