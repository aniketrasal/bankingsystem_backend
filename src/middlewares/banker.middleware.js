const bankManagerMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== 'bank_manager') {
      throw new Error();
    }

    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized access.' });
  }
};

module.exports = bankManagerMiddleware;
