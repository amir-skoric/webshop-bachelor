module.exports = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Signed out" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
