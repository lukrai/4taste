import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
const keys = require('./config/keys');

import FeedRouter from './routes/feed.router';
// Creates and configures an ExpressJS web server.
class App {
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.mongoSetup();
        this.middleware();
        this.routes();
    }

    private mongoSetup(): void {
        mongoose.connect(keys.mongoURL);
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {

        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/feed', FeedRouter);
    }

}

export default new App().express;