const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('file');
const uniqid = require('uniqid');
const path = require('path');

const storageMultiple = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + uniqid() + path.extname(file.originalname));
	}
});

const multerUplaodFiles = multer({ storage: storageMultiple }).array('files');

module.exports = {
	multerUploads,
	multerUplaodFiles
};
