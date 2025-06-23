
import { ICarResponse } from '../dtos/CarsDTO';
import { ICar } from '../models/Car';

export function handleCarResponse(cars: ICar[] | ICar): ICarResponse[] {
    const carArray = Array.isArray(cars) ? cars : [cars];
    return carArray.map(car => ({
        _id: car._id, 
        Brand: car.Brand,
        Model: car.Model,
        AccelSec: car.AccelSec,
        TopSpeed_KmH: car.TopSpeed_KmH,
        Range_Km: car.Range_Km,
        Efficiency_WhKm: car.Efficiency_WhKm,
        FastCharge_KmH: car.FastCharge_KmH,
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