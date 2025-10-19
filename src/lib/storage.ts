import { put } from '@vercel/blob';

export async function uploadFile(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    return blob.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw new Error('Failed to upload files');
  }
}
