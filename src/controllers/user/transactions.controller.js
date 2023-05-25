const User = require("../../models/user.model");
const Account = require("../../models/account.model");
const jwt = require("jsonwebtoken");

const token_secret = process.env.TOKEN_KEY;

let transactionsController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let decode = jwt.decode(token, token_secret);

  try {
    let transaction = await Account.find({ userId: decode._id });
    return res.status(200).send({ transactions: transaction });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

module.exports = transactionsController;
