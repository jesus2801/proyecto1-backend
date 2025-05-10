module.exports = (required) => (req, res, next) => {
  if (!req.user.roles.includes(required)) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
