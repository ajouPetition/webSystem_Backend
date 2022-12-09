const jwt = require("jsonwebtoken");
require("dotenv").config();
// const env = process.env;
module.exports = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];
      console.log(`token : ${token}`);
      const result = jwt.verify(token, process.env.JWT_KEY); // token을 검증합니다.
      if (result.userID) {
        req.decoded = result.userID;
        next();
      } else {
        res.status(401).send({
          ok: false,
          message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
        });
      }
    }
  } catch (err) {
    res.status(401).json({ error: "로그인이 필요합니다.3" });
    next(err);
  }
};
