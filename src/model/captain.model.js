import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CaptainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    team_name: { type: String, required: true, unique: true },
    is_match_searchingig: { tpye: Boolean, default: false },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

CaptainSchema.pre("save", async function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(process.env.saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});

// Used for logging in
CaptainSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

//kullancıcı girişi yapmak için model oluşturuyoruz.
const Captain = mongoose.model("Captain", CaptainSchema);
export default User;
