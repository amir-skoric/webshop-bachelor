module.exports = async (req, res) => {
  try {
    //get session
    const session = req.session;
    if (session) {
      res.status(200).json({ session: session });
    } else if (session) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
