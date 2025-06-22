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
            switch (queryType) {
                case "isEqual":
                    query[column] = value;
                    break;
                case "startsWith":
                    query[column] = { $regex: `^${value}`, $options: "i" };
                    break;
                case "endsWith":
                    query[column] = { $regex: `${value}$`, $options: "i" };
                    break;
                case "contains":
                    query[column] = { $regex: value, $options: "i" };
                    break;
                case "isEmpty":
                    query[column] = { $in: [null, ""] };
                    break;
                default:
                    throw new Error("Invalid queryType");
            }
        }

        const cars: ICar[] = await Car.find(query);
        const cars_resp = handleCarResponse(cars);
        return cars_resp;
    }
}