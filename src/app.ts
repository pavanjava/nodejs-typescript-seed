import * as express from 'express';
import {Application} from 'express';
import * as dotenv from "dotenv";

class App {
    public app: Application;
    public port: number;
    public dbHelper: any;

    constructor(appInit: { port: number; middleWares: any; controllers: any; mongoHelper: any; }) {
        dotenv.config();

        console.info(`Using profile: ${process.env.HABITAT}`);

        const path = `${__dirname}/resources/.env.${process.env.HABITAT}`;

        console.info(`Profile path: ${path}`);

        dotenv.config({path:path});

        this.app = express();
        this.port = appInit.port;
        this.dbHelper = appInit.mongoHelper;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);

    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api/v1', controller.router);
        });
    }

    public listen() {

        this.app.listen(this.port, async () => {
            console.log(`db_user: ${process.env.db_user}`,`db: ${process.env.db}`,`collection: ${process.env.collection}`);
            await this.dbHelper.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_password}@testcluster-pqopw.azure.mongodb.net/test?authSource=admin&replicaSet=TestCluster-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`);
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App
