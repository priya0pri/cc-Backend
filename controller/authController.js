const AuthModule = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, "priya sec key", { expiresIn: "2h" });
};
module.exports.sign_up = async (req, res) => {
  AuthModule.create(req.body)
    .then((user) => {
      console.log("saved", JSON.stringify(user._id));
      const token = createToken(JSON.stringify(user._id));
      console.log(token, "jwttoken");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1 });
      res.json({ message: "User created successfully", data: user });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).json({ error: "Unable to create" });
    });
 
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModule.findOne({ email });
    console.log(user, "user");
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, "loginemail");

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports.users = (req, res) => {
  AuthModule.find().then((user) => res.json(user));
};
