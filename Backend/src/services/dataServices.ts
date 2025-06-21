import { ICar } from "../models/Car";
import Car from "../models/Car";

export class DataServices {
    async getAllCarsData(): Promise<ICar[]> {
        const cars = await Car.find();
        return cars;
    }

    async deleteCarById(carId: string): Promise<ICar | null> {
        const deletedCar = await Car.findByIdAndDelete(carId);
        return deletedCar;
    }

    async searchCarsByQuery(searchTerm: string): Promise<ICar[]> {
        const searchFields = ["Brand", "Model", "PowerTrain", "PlugType", "BodyStyle"];
        const dataQueries = searchFields.map(field => ({
            [field]: { $regex: searchTerm, $options: "i" } 
        }));
        const cars:ICar[] = await Car.find({ $or: dataQueries });
        return cars;
    }

    async filterCarsByQuery(column: string, queryType: string, value: string | number): Promise<ICar[]> {

        const numberColumns = ["Year", "Price", "Mileage"];
        let query: any = {};

        if (numberColumns.includes(column)) {
            // Handle number columns
            switch (queryType) {
                case "isEqual":
                    query[column] = Number(value);
                    break;
                case "isEmpty":
                    query[column] = { $in: [null] };
                    break;
                default:
                    throw new Error("Invalid queryType for number column");
            }
        } else {
            // Handle string columns
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
        return cars;
    }
}