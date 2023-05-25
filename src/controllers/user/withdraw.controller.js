const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const token_secret = process.env.TOKEN_KEY;

let withdrawController = async (req, res) => {
  let { ammount, type } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  let decode = jwt.decode(token, token_secret);

  ammount = Number(ammount);
  if (type !== "withdraw") {
    return res.status(400).send({ message: "wrong api" });
  }

  try {
    let user = await User.findOne(
      { _id: decode._id },
      { password: 0, role: 0, token: 0 }
    );
    if (user.balance < ammount) {
        return res.status(400).send({ message: "Insufficient Funds" });
    }
    let rem_balance = user.balance - ammount;
    return res.status(200).send({ message:"Money withdrawal successful" });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

module.exports = withdrawController;
