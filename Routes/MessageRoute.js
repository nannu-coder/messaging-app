const router = require("express").Router();
const { postMessage, getMessage } = require("../Controller/MessageController");

router.post("/message", postMessage);
router.get("/message/:conversationId", getMessage);

module.exports = router;
