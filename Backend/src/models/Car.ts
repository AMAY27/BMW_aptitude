import mongoose, { Schema, Document } from "mongoose";

export interface ICar {
  _id: any;
  Brand: string;
  Model: string;
  AccelSec: number;
  TopSpeed_KmH: number;
  Range_Km: number;
  Efficiency_WhKm: number;
  FastCharge_KmH: number;
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
    TopSpeed_KmH: {
      type: Number,
      required: true,
    },
    Range_Km: {
      type: Number,
      required: true,
    },
    Efficiency_WhKm: {
      type: Number,
      required: true,
    },
    FastCharge_KmH: {
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
