const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token no proporcionado" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};
