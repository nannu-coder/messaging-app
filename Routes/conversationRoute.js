const router = require("express").Router();
const {
  conversation,
  getConversation,
} = require("../Controller/conversationController");

router.post("/conversation", conversation);
router.get("/conversation/:userId", getConversation);

module.exports = router;
