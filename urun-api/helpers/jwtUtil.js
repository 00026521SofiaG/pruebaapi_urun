const jwt = require("jsonwebtoken");
const secret = process.env.JWTSECRET || "secret";

// Generating a JWT token
const generateToken = (user_id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { user_id };

// Signing  a JWT that is valid for 30 days.   
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error at generating JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
    generateToken,
};