
import { ICarResponse } from '../dtos/CarsDTO';
import { ICar } from '../models/Car';

export function handleCarResponse(cars: ICar[] | ICar): ICarResponse[] {
    const carArray = Array.isArray(cars) ? cars : [cars];
    return carArray.map(car => ({
        _id: car._id, // Convert ObjectId to string
        Brand: car.Brand,
        Model: car.Model,
        AccelSec: car.AccelSec,
        TopSpeedKmH: car.TopSpeedKmH,
        RangeKm: car.RangeKm,
        EfficiencyWhKm: car.EfficiencyWhKm,
        FastChargeKmH: car.FastChargeKmH,
        RapidCharge: car.RapidCharge,
        PowerTrain: car.PowerTrain,
        PlugType: car.PlugType,
        BodyStyle: car.BodyStyle,
        Segment: car.Segment,
        Seats: car.Seats,
        PriceEuro: car.PriceEuro,
        Date: car.Date
    }));
}