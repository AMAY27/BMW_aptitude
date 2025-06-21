import { Router, Request, Response, NextFunction } from 'express';
import { DataControllers } from '../controllers/dataControllers';

const router = Router();
const dataControllers = new DataControllers();

router.get(
    '/cars',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await dataControllers.getAllCarsData(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.delete(
    '/cars/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await dataControllers.deleteCarById(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/cars/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await dataControllers.searchCarsByQuery(req, res);
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/cars/filter',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await dataControllers.filterCarsByQuery(req, res);
        } catch (error) {
            next(error);
        }
    },
);

export default router;

