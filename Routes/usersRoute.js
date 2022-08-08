const router = require("express").Router();
const { getUser } = require("../Controller/usersController");

router.get("/getUser", getUser);

module.exports = router;
