import * as multer from "multer";
const path = require('path');

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/resources/'));
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

let uploadFile = multer({ storage: storage, fileFilter: csvFilter });
export default { uploadFile };
