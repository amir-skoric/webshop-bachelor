//imports
const sessionCollection = require("../../models/sessionCollection");

module.exports = async (req, res) => {
  try {
    //get session id
    const session = req.session;
    if (session) {
      res.status(200).json({ session: session });
    } else if (session) {
      return res.status(404).json({ msg: "Something went wrong" });
    }
  } catch (error) {
    res.send(error);
  }
};
