const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    faces:{
      type: Array,
      default: []
    },
    friends: {
      type: Object,
      default: {
        empty: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
