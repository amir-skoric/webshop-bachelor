module.exports = async (req, res, next) => {
  try {
    if (req.session.isAuthenticated) {
      next();
    } else return res.status(404).json({ error: "Authentication Error" });
  } catch (error) {
    res.status(404).json(error);
  }
};
