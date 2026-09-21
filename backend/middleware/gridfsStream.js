import { GridFSBucket } from 'mongodb';
import path from 'path';
import fs from 'fs';

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export function gridfsMediaHandler(db) {
  const bucket = new GridFSBucket(db, { bucketName: 'media_files' });
  const filesCol = db.collection('media_files.files');

  return async (req, res) => {
    try {
      // req.params[0] captures everything after /uploads/ or /api/uploads/
      const rawPath = (req.params[0] || req.params.filename || '').replace(/^\/+/, '');
      if (!rawPath) {
        return res.status(404).json({ error: 'File path required' });
      }

      const filename = path.basename(rawPath);
      const ext = path.extname(filename).toLowerCase();

      // 1. Check local disk fallback if present
      const localDiskPath = path.join(process.cwd(), 'uploads', rawPath);
      if (fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).isFile()) {
        return res.sendFile(path.resolve(localDiskPath));
      }

      // 2. Query GridFS
      const query = {
        $or: [
          { filename: filename },
          { 'metadata.filename': filename },
          { 'metadata.storedPath': `/uploads/${rawPath}` },
          { 'metadata.storedPath': rawPath },
          { 'metadata.storedPath': { $regex: `${filename}$` } },
          { filename: rawPath },
        ],
      };

      const fileDoc = await filesCol.findOne(query);

      if (!fileDoc) {
        return res.status(404).json({ error: 'File not found in media storage', file: rawPath });
      }

      const contentType =
        fileDoc.contentType ||
        fileDoc.metadata?.contentType ||
        fileDoc.metadata?.mimeType ||
        MIME_TYPES[ext] ||
        'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Access-Control-Allow-Origin', '*');

      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileDoc.length - 1;
        const chunksize = end - start + 1;

        res.status(206);
        res.setHeader('Content-Range', `bytes ${start}-${end}/${fileDoc.length}`);
        res.setHeader('Content-Length', chunksize);

        const downloadStream = bucket.openDownloadStream(fileDoc._id, {
          start,
          end: end + 1,
        });
        return downloadStream.pipe(res);
      }

      res.setHeader('Content-Length', fileDoc.length);
      const downloadStream = bucket.openDownloadStream(fileDoc._id);
      downloadStream.pipe(res);
    } catch (err) {
      console.error('[GridFS Media Handler Error]', err);
      res.status(500).json({ error: 'Failed to stream media', details: err.message });
    }
  };
}

