import { app } from "./app";
const mongoose = require('mongoose')

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {});
  } catch (err) {
    console.error(err);
  }
  
  
  app.listen(3001,"0.0.0.0", () => {
    console.log("Listening on port 3001!!!!!!!!");
  });
};

start();