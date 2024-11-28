import mongoose from "mongoose"
import { MONGODB_URI } from "./env"

async function dbConnection() {
  await mongoose.connect(MONGODB_URI).then((v) => {
    console.log("Connected to DB.")
  }).catch((e) => {
    console.error(e)
  })
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default dbConnection