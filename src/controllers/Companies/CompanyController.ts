import * as express from 'express'
import {Request, Response} from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import {MongoHelper} from "../../helpers/MongoHelper";
import {GenericResponse} from '../../helpers/GenericResponse';

class CompanyController implements IControllerBase {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private getCollection = () => {
        return MongoHelper.client.db(process.env.db).collection(process.env.collection);
    };

    public initRoutes() {
        this.router.get('/companies', this.companies);
    }

    companies = (req: Request, res: Response) => {

        const collection = this.getCollection();
        const response = GenericResponse.responseObject();

        collection.find({}).limit(10).toArray((err,result) => {
           if(err){
               response.error = err;
               res.status(500).json(response);
           }else{
               response.data = result;
               res.status(200).json(response);
           }
        });
    }
}

export default CompanyController;
