import {Request, Response} from "express";

import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import methodoverride = require("./methodoverride");

class BaseMiddlerware {

    static get configuration() {
        var app = express();

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());

        app.use(methodoverride.configuration());

        //router settings
        
        // catch 404 and forward to error handler
        app.use((req: Request, res: Response, next: Function) => {
            var err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use((err: any, req: Request, res: Response, next: Function) => {
                res.status(err.status || 500);
                res.json({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err: any, req: Request, res: Response, next: Function) => {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: {}
            });
        });
        

        return app;
    }
}
Object.seal(BaseMiddlerware);
export = BaseMiddlerware;