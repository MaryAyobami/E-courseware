const Express = require("express");
const admin = require("firebase-admin");
const attachStudent = require('../auth/attachStudent');

const serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];


const router = Express.Router();




router.post("/notifications", attachStudent, async (req, res) => {
  try {

    const sender = req.user.sub
    // const { title, body, imageUrl } = req.body;
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

module.exports = router