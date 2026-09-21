import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsRoot = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // place all uploads under backend/uploads
    cb(null, uploadsRoot);
  },
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});

export const companyUpload = multer({ storage });

export default companyUpload;
