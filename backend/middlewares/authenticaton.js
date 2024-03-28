import jwt from "jsonwebtoken";

export const authetication = (req, res, next) => {
  try {
    const authorization_header = req.headers.authorization;
    if (!authorization_header) {
      return res.status(400).send({ msg: "Authorization header is missing" });
    }
    const token = authorization_header.split(" ")[1];

    jwt.verify(token, "shhhhh", async function (err, decoded) {
      if (decoded) {
        const userId = decoded.userId;
        req.userId = userId;
        next();
      } else {
        return res.status(400).send({ msg: "Login first" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
