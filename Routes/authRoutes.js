const router = require("express").Router();
const { register, login, getUser } = require("../Controller/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUser);

module.exports = router;
