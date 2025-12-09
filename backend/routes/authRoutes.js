const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect , getUserInfo);
router.post("/upload-image", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use backend BASE_URL so frontend never receives localhost:8000
  const serverURL = process.env.BASE_URL; 
  const imageUrl = `${serverURL}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});


module.exports = router;
