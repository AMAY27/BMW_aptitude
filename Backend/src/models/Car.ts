import mongoose, { Schema, Document } from "mongoose";

export interface ICar {
  _id: any;
  Brand: string;
  Model: string;
  AccelSec: number;
  TopSpeedKmH: number;
  RangeKm: number;
  EfficiencyWhKm: number;
  FastChargeKmH: number;
  RapidCharge: string;
  PowerTrain: string;
  PlugType: string;
  BodyStyle: string;
  Segment: string;
  Seats: number;
  PriceEuro: number;
  Date: string;
}

const carSchema: Schema<ICar> = new Schema(
  {
    Brand: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    AccelSec: {
      type: Number,
      required: true,
    },
    TopSpeedKmH: {
      type: Number,
      required: true,
    },
    RangeKm: {
      type: Number,
      required: true,
    },
    EfficiencyWhKm: {
      type: Number,
      required: true,
    },
    FastChargeKmH: {
      type: Number,
      required: true,
    },
    RapidCharge: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    PowerTrain: {
      type: String,
      required: true,
    },
    PlugType: {
      type: String,
      required: true,
    },
    BodyStyle: {
      type: String,
      required: true,
    },
    Segment: {
      type: String,
      required: true,
    },
    Seats: {
      type: Number,
      required: true,
    },
    PriceEuro: {
      type: Number,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
  }
);

const Car = mongoose.model<ICar>("Car", carSchema);
export default Car;
