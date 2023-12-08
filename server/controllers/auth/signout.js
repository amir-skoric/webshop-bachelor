module.exports = async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.status(200).json({ msg: "Logged out" });
};
