import { BaseController } from '../core/BaseController';
const fs = require("fs");
const csv = require("fast-csv");
const path = require('path');
import { Cars } from "../models/Cars";

export class UploadCSVController extends BaseController {
    protected async executeImpl(): Promise<void | any> {
        try {
            
            if (this.req.file == undefined) {
                return this.res.status(400).send("Please upload a CSV file!");
            }

            let filePath = path.join(__dirname, '/../middleware/resources/') + this.req.file.filename;

            fs.createReadStream(filePath)
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    row.provider = this.req.body.provider;
                    Cars.create(row, function(err, car) {
                        if (err) return this.fail(err);
                    });
                })
                .on("end", () => {
                    this.res.status(200).send({
                        message:
                            "Uploaded the file successfully: " + this.req.file.originalname,
                    });
                });
        } catch (err) {
            return this.fail(err.message)
        }
    }
} 