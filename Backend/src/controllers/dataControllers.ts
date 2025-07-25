import { ICar } from "../models/Car";
import { DataServices } from "../services/dataServices";
import { Request, Response } from "express";
import { validateFilterInput } from "../validators/dataValidators";

export class DataControllers {
    private dataServices: DataServices;

    constructor() {
        this.dataServices = new DataServices();
    }

    async getAllCarsData(res: Response): Promise<void> {
        try {
            const cars = await this.dataServices.getAllCarsData();
            if (cars){
                res.status(200).json(cars);
            }
            else {
                res.status(404).json({ message: "No cars found" });
            }
        }
        catch (error) {
            console.error("Error fetching all cars data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAllCarDataWithPagination(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        try {
            const cars = await this.dataServices.getAllCarsDataWithPagination(page, limit);
            if (cars.data && cars.data.length > 0) {
                res.status(200).json(cars);
            } else {
                res.status(404).json({ message: "No cars found" });
            }
        } catch (error) {
            console.error("Error fetching all cars data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async deleteCarById(req: Request, res:Response): Promise<void> {
        const carId = req.params.id;
        try {
            await this.dataServices.deleteCarById(carId);
            res.status(200).json({ message: "Car deleted successfully" });
        } catch (error) {
            console.error("Error deleting car by ID:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async updateCar(req: Request, res: Response): Promise<void> {
        const carId = req.params.id;
        try {
            const updatedCar = await this.dataServices.updateCar(carId, req.body);
            if (updatedCar) {
                res.status(200).json(updatedCar);
            } else {
                res.status(404).json({ message: "Car not found" });
            }
        } catch (error) {
            console.error("Error updating car:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async searchCarsByQuery(req: Request, res:Response): Promise<void> {
        const searchTerm = req.query.q as string;
        if (!searchTerm || searchTerm.trim() === "") {
            res.status(400).json({ error: "Search term is required" });
            return;
        }
        try {
            const cars = await this.dataServices.searchCarsByQuery(searchTerm);
            if (cars && cars.length > 0) {
                res.status(200).json(cars);
            } else {
                res.status(404).json({ message: "No cars found matching the search" });
            }
        } catch (error) {
            console.error("Error searching cars:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async filterCarsByQuery(req: Request, res: Response): Promise<void> {
        const { column, queryType, value, type } = req.query;
        
        const validationError = validateFilterInput(column as string, queryType as string, value as string, type as "string" );
        if (validationError) {
            res.status(400).json({ error: validationError.error });
            return;
        }
        try {
            const cars = await this.dataServices.filterCarsByQuery(
                column as string,
                queryType as string,
                value as string | number,
                type as string
            );
            if (cars.length > 0) {
                res.status(200).json(cars);
            }
            else {
                res.status(404).json({ message: "No cars found matching the filter" });
            }
        } catch (error) {
            console.error("Error filtering cars:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}