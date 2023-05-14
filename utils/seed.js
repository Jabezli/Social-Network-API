const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  //Drop users if existed
  await User.deleteMany({});

  //Drop thoughts if existed
  await Thought.deleteMany({});

  //Add users
  await User.collection.insertMany(userData);

  console.table(userData);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
