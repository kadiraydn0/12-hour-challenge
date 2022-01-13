import express from "express";
import _ from "lodash";

export async function createUserHandler(req, res) {
  try {
    const user = req.body;
    await createUser({ ...user });
    res.send("User created.");
  } catch (e) {
    res.status(409).send(e.message);
  }
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
