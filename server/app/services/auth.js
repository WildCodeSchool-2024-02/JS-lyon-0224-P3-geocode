const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 3,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extract the password from the request body
    const { password } = req.body;

    // Hash the password with the hashing options
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Add the hashed password to the request body
    req.body.hashedPassword = hashedPassword;

    // Delete the original password from the request body
    delete req.body.password;

    // Call the next middleware function
    next();
  } catch (err) {
    next(err);
  }
};

const verifyCookie = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    return next();
  } catch (err) {
    return res.sendStatus(404).send("il y eu une erreur");
  }
};

module.exports = {
  hashPassword,
  verifyCookie,
};
