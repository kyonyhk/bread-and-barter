import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import formidable from 'formidable';
import fs from 'fs';
import type { NextApiRequest } from 'next';
import { BUCKET_NAME, s3Client } from './s3';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface UploadedFile {
  url: string;
  key: string;
  type: string;
}

export async function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function uploadFileToS3(
  file: formidable.File
): Promise<UploadedFile> {
  const fileStream = fs.createReadStream(file.filepath);
  const fileExtension = file.originalFilename?.split('.').pop() || '';
  const key = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype || undefined,
  });

  await s3Client.send(command);

  // Generate a signed URL that expires in 1 hour
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return {
    url: signedUrl,
    key,
    type: file.mimetype || '',
  };
}
