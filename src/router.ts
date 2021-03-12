import * as express from 'express';
const router = express.Router();
import { UploadCSVController }  from "./controller/csv";
import uploadFile from "./middleware/upload";

let routes = (app) => {
    router.post("/upload", uploadFile.uploadFile.single("file") ,  (req, res) => new UploadCSVController().execute(req, res));

    app.use("/api/csv", router);
};

export { routes };