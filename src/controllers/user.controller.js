const User = require("../models/User");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.update = async (req, res) => {
  try {
    const { name = "", email = "", roles = [] } = req.body || {};
    const updates = {};

    if (name.trim()) updates.name = name.trim();
    if (email.trim()) updates.email = email.trim();
    if (roles.length) updates.roles = roles;

    // Auth checks
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.id !== req.params.id && !req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // If they're trying to change email, make sure it's not already taken
    if (updates.email) {
      const existing = await User.findOne({ email: updates.email });
      if (existing && existing.id !== req.params.id) {
        return res
          .status(409)
          .json({ message: "That email address is already in use." });
      }
    }

    // Perform the update
    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);

    // If Mongo reports a duplicate-key error anyway, catch it here
    if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(409)
        .json({ message: "The email address is already in use." });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.softDelete = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.roles.includes("admin")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await User.findByIdAndUpdate(req.params.id, { active: false });
  res.json({ message: "Usuario desactivado" });
};
