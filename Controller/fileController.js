const fs = require('fs');
const path = require('path');
const multer = require('multer');
const File = require('../Model/File');
const User = require('../Model/User');
const { encryptData } = require('../utils/encription');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const opsUserId = req.userId;
    const userFolderPath = `uploads/${opsUserId}`;
    fs.mkdirSync(userFolderPath, { recursive: true });
    cb(null, userFolderPath);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '');
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['pptx', 'docx', 'xlsx'];
  const fileType = file.originalname.split('.').pop();
  if (allowedTypes.includes(fileType)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).single('file');

const uploadFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'Invalid file type' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const opsUserId = req.userId;
      const { originalname } = req.file;

      const file = new File({
        filename: originalname,
        fileType: originalname.split('.').pop(),
        opsUserId,
      });
      await file.save();

      res.status(201).json({ message: 'File uploaded successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const downloadFile = async (req, res) => {
    try {
      const fileId = req.params.fileId;
      const file = await File.findById(fileId);
  
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      // Check if the requesting user has permission (client user)
      if (file.opsUserId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }
  
      const filePath = path.join(__dirname, `../../uploads/${file.opsUserId}/${file.filename}`);
      const encryptedFilePath = encryptData(filePath);
  
      res.status(200).json({
        downloadLink: `/api/file/download/${fileId}/${encryptedFilePath}`,
        message: 'Success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const listFiles = async (req, res) => {
    try {
      const opsUserId = req.userId;
      const files = await File.find({ opsUserId });
  
      res.status(200).json({ files });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { downloadFile, listFiles,uploadFile };
