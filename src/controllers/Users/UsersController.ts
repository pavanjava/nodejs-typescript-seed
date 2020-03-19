import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

class UsersController implements IControllerBase {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/users', this.users);
    }

    users = (req: Request, res: Response) => {

        const users = [
            {
                id: 1,
                name: 'Ali'
            },
            {
                id: 2,
                name: 'Can'
            },
            {
                id: 3,
                name: 'Ahmet'
            }
        ]

        res.send({ users });
    }
}

export default UsersController;