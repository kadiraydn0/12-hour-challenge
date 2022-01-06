import mongoose from "mongoose";

const EncountersSchema = new mongoose.Schema({
  first_captain: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  second_captain: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  astroturf: { type: mongoose.Schema.Types.ObjectId, ref: "Astroturf" },
//   time: 
});
