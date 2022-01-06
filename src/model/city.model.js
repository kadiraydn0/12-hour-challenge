import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  city_name: { type: String, required: true },
});

const City = mongoose.model("City", CitySchema);

export default City;
