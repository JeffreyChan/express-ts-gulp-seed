"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodoverride = require("./methodoverride");
var BaseMiddlerware = (function () {
    function BaseMiddlerware() {
    }
    Object.defineProperty(BaseMiddlerware, "configuration", {
        get: function () {
            var app = express();
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(cookieParser());
            app.use(methodoverride.configuration());
            //router settings
            // catch 404 and forward to error handler
            app.use(function (req, res, next) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });
            // error handlers
            // development error handler
            // will print stacktrace
            if (app.get('env') === 'development') {
                app.use(function (err, req, res, next) {
                    res.status(err.status || 500);
                    res.json({
                        message: err.message,
                        error: err
                    });
                });
            }
            // production error handler
            // no stacktraces leaked to user
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.json({
                    message: err.message,
                    error: {}
                });
            });
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return BaseMiddlerware;
}());
Object.seal(BaseMiddlerware);
module.exports = BaseMiddlerware;

//# sourceMappingURL=base.js.map
