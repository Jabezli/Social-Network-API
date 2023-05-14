const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

//this is a pre-hook to remove all thoughts of a user when the user is deleted.
userSchema.pre("findOneAndDelete", async function (next) {
  //find the user got deleted first.
  const user = await this.model.findOne(this.getQuery());
  //delete all thoughts related to the user. The $in operator is to match ids of thoughts in the user.thoughts array.
  await mongoose.model("Thought").deleteMany({ _id: { $in: user.thoughts } });
  next();
});

const User = model("user", userSchema);

module.exports = User;
