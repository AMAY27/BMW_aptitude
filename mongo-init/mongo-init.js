db = db.getSiblingDB('bmw-aptitude'); // replace with your DB name

db.cars.insertMany([
  {
    Brand: "BMW",
    Model: "i4",
    AccelSec: 5.7,
    TopSpeedKmH: 190,
    RangeKm: 590,
    EfficiencyWhKm: 160,
    FastChargeKmH: 140,
    RapidCharge: "Yes",
    PowerTrain: "RWD",
    PlugType: "Type2",
    BodyStyle: "Sedan",
    Segment: "D",
    Seats: 5,
    PriceEuro: 55000,
    Date: "2025-01-01"
  }
  // ...add more cars as needed
]);