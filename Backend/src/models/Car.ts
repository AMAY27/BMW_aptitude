import mongoose, { Schema, Document } from "mongoose";

export interface ICar {
  brand: string;
  model: string;
  accelSec: number;
  topSpeedKmH: number;
  rangeKm: number;
  efficiencyWhKm: number;
  fastChargeKmH: number;
  rapidCharge: string;
  powerTrain: string;
  plugType: string;
  bodyStyle: string;
  segment: string;
  seats: number;
  priceEuro: number;
  date: string;
}

const carSchema: Schema<ICar> = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    accelSec: {
      type: Number,
      required: true,
    },
    topSpeedKmH: {
      type: Number,
      required: true,
    },
    rangeKm: {
      type: Number,
      required: true,
    },
    efficiencyWhKm: {
      type: Number,
      required: true,
    },
    fastChargeKmH: {
      type: Number,
      required: true,
    },
    rapidCharge: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    powerTrain: {
      type: String,
      required: true,
    },
    plugType: {
      type: String,
      required: true,
    },
    bodyStyle: {
      type: String,
      required: true,
    },
    segment: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    priceEuro: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  }
);

const Car = mongoose.model<ICar>("Car", carSchema);
export default Car;
