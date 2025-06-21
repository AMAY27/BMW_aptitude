import { Router, Request, Response, NextFunction } from 'express';
import { DataControllers } from '../controllers/dataControllers';

const router = Router();
const dataControllers = new DataControllers();

router.get(
    '/cars',
    async (req: Request, res: Response) => {
        await dataControllers.getAllCarsData(res);
    },
);

router.delete(
    '/cars/:id',
    async (req: Request, res: Response) => {
        await dataControllers.deleteCarById(req, res);
    },
);

router.get(
    '/cars/search',
    async (req: Request, res: Response) => {
        await dataControllers.searchCarsByQuery(req, res);
    },
);

router.get(
    '/cars/filter',
    async (req: Request, res: Response) => {
        await dataControllers.filterCarsByQuery(req, res);
    },
);

export default router;
