import * as express from "express";
import { ValidationError } from 'express-validator';

export abstract class BaseController {
    protected req: express.Request;
    protected res: express.Response;

    protected abstract executeImpl(): Promise<void | any>;

    public async execute(req: express.Request, res: express.Response): Promise<void> {
        this.req = req;
        this.res = res;

        try {
            await this.executeImpl();
        } catch (err) {
            console.log(`[BaseController]: Error causado por el controllador`);
            console.log(err);
        }
    }

    protected jsonResponse(code: number, message: string) {
        return this.res.status(code).json({ message });
    }

    protected ok<T>(dto?: T) {
        if (!!dto) {
            return this.res.status(200).json(dto);
        } else {
            return this.res.status(200).json(true);
        }
    }

    protected created() {
        return this.res.sendStatus(201);
    }

    protected fail(error: any | string | ValidationError[]) {
        return this.res.status(500).json({
            message: error
        })
    }

}