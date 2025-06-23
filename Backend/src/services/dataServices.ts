import { ICar } from "../models/Car";
import Car from "../models/Car";
import { handleCarResponse } from "../responseHandlers/CarResponseHandlers";
import { ICarResponse } from "../dtos/CarsDTO";

export class DataServices {
    async getAllCarsData(): Promise<ICarResponse[]> {
        const cars = await Car.find().lean();
        return handleCarResponse(cars);
    }

    async deleteCarById(carId: string): Promise<ICar | null> {
        const deletedCar = await Car.findByIdAndDelete(carId);
        return deletedCar;
    }

    async searchCarsByQuery(searchTerm: string): Promise<ICarResponse[]> {
        const searchFields = ["Brand", "Model", "PowerTrain", "PlugType", "BodyStyle"];
        const dataQueries = searchFields.map(field => ({
            [field]: { $regex: searchTerm, $options: "i" } 
        }));
        const cars = await Car.find({ $or: dataQueries });
        return handleCarResponse(cars);
    }

    async filterCarsByQuery(column: string, queryType: string, value: string | number, type:string): Promise<ICarResponse[]> {

        let query: any = {};

        // Helper to escape regex special characters
        const escapeRegex = (val: string) => val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (type === "number") {
            switch (queryType) {
                case "isEqual":
                    query[column] = Number(value);
                    break;
                case "isEmpty":
                    query[column] = { $in: [null] };
                    break;
                case "isGreaterThan":
                    query[column] = { $gt: Number(value) };
                    break;
                case "isLessThan":
                    query[column] = { $lt: Number(value) };
                    break;
                case "isGreaterThanOrEqual":
                    query[column] = { $gte: Number(value) };
                    break;
                case "isLessThanOrEqual":
                    query[column] = { $lte: Number(value) };
                    break;
                default:
                    throw new Error("Invalid queryType for number column");
        }
        } else if (type === "string") {
            const val = typeof value === 'string' ? value.trim() : value;
            let regex;
            switch (queryType) {
                case "isEqual":
                    regex = `^${escapeRegex(val as string)}$`;
                    query[column] = { $regex: regex, $options: "i" };
                    break;
                case "startsWith":
                    regex = `^${escapeRegex(val as string)}`;
                    query[column] = { $regex: regex, $options: "i" };
                    break;
                case "endsWith":
                    regex = `${escapeRegex(val as string)}$`;
                    query[column] = { $regex: regex, $options: "i" };
                    break;
                case "contains":
                    regex = escapeRegex(val as string);
                    query[column] = { $regex: regex, $options: "i" };
                    break;
                case "isEmpty":
                    query[column] = { $in: [null, ""] };
                    break;
                default:
                    throw new Error("Invalid queryType");
            }
            // Debug log
            console.log('Filter Query:', JSON.stringify(query));
        }

        const cars: ICar[] = await Car.find(query);
        const cars_resp = handleCarResponse(cars);
        return cars_resp;
    }
}