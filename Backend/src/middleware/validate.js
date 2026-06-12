module.exports = (req, res, next) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      success: false,
      message: "Valid title is required",
    });
  }

  next();
};
