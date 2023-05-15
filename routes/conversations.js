const router = require("express").Router();
const Conversation = require("../models/conversation");

//new conv

router.post("/add", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete conv includes two userId

router.delete("/delete/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    await conversation.deleteOne();
    res.status(200).json("conversation got deleted")
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allconvo", async (req, res)=>{
  try {
    const conversations = await Conversation.find();
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
