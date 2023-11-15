module.exports = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).send({ msg: "Logged out" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
