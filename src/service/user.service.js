import { validatePassword } from "./captain.service.js";
import { sessionCreate, signJWTToken } from "./session.service.js";


// (async () => {
//   try {
//     User.create({
//       name:"Super",
//       lastname:"Admin",
//       email:"admin@digigarson.com",
//       password:"123456",
//       permissions:[0],
//       role:"superadmin"
//     })
//   } catch (e) {
//     console.log(e)

//   }
// })();
// (async () => {
//   try {

//   } catch (e) {
//     console.log(e)

//   }
// })();



export function createUser(input) {
  return User.create(input);
}

export async function signInHandler(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email or password not provided" });

  const user = await validatePassword({ email, password });
  if (!user) {
    return res.status(401).send("Wrong username or password");
  }
  const accessToken = signJWTToken(user);
  await sessionCreate(user._id, req.get("user-agent") || "");
  return res.json({ success: true, accessToken });
}

export async function validatePassword({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return _.omit(user.toJSON(), ["password", "createdAt", "updatedAt", "__v"]);
}
