import mongoose from "mongoose";

const FieldsSchema = new mongoose.Schema({
  field_name: { type: String, required: true },
  //   hours:
});

const AstroturfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  address: { type: String, max: 120 },
  fields: [FieldsSchema],
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  is_it_approved: { type: Boolean, default: false },
});

const Astroturf = mongoose.model("Astroturf", AstroturfSchema);

export default AstroturfSchema;