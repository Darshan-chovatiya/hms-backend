const express = require("express");
const { driverAuthToken } = require("../middlewares/authenticator");
const { signIn, verifyToken, signUp } = require("../controllers/driver/driver-auth");
const { updateDriverProfile, UpdateDriverPassword } = require("../controllers/driver/driver");
const router = express.Router();

router.post("/login" , signIn)
router.post("/signup" , signUp)
router.get("/verify-driver", driverAuthToken, verifyToken);

router.put("/profile/update/:id",driverAuthToken, updateDriverProfile);

router.put("/change-password/:id", driverAuthToken, UpdateDriverPassword);


module.exports = router;
