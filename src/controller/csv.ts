import { BaseController } from '../core/BaseController';
const fs = require("fs");
const csv = require("fast-csv");
const path = require('path');
import { Cars } from "../models/Cars";
import * as config from '../config.json'; 

export class UploadCSVController extends BaseController {
    protected async executeImpl(): Promise<void | any> {
        try {
            
            if (this.req.file == undefined) {
                return this.res.status(400).send("Please upload a CSV file!");
            }

            if (!config[this.req.body.provider]) {
                return this.clientError('Proveedor no encontrado en el archivo de config');
            }

            let filePath = path.join(__dirname, '/../middleware/resources/') + this.req.file.filename;

            fs.createReadStream(filePath)
                .pipe(csv.parse({ headers: true }))
                .on("error", (error) => {
                    return this.fail(error.message);
                })
                .on("data", (row) => {
                    const car = {
                        "UUID": row[config[this.req.body.provider].UUID],
                        "VIN": row[config[this.req.body.provider].VIN],
                        "Make": row[config[this.req.body.provider].Make],
                        "Model": row[config[this.req.body.provider].Model],
                        "Mileage": row[config[this.req.body.provider].Mileage],
                        "Year": row[config[this.req.body.provider].Year],
                        "Price": row[config[this.req.body.provider].Price],
                        "Zip Code": row[config[this.req.body.provider]["Zip Code"]],
                        "Create Date": row[config[this.req.body.provider]["Create Date"]],
                        "Update Date": row[config[this.req.body.provider]["Update Date"]],
                        "provider" : this.req.body.provider
                    };
                    Cars.create(car, function(err, car) {
                        if (err) return this.fail(err);
                    });  
                })
                .on("end", () => {
                    return this.res.status(200).send({
                        message:
                            "Uploaded the file successfully: " + this.req.file.originalname,
                    });
                });
        } catch (err) {
            return this.fail(err.message)
        }
    }
} 