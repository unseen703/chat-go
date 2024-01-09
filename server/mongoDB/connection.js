import mongoose from "mongoose";
const mongoDBConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("successesfully connected with database");
  } catch (error) {
    console.log("Database Connection error" + error);
  }
};
export default mongoDBConnect;
