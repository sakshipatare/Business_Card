import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  companyName: String,
  companyNumber: String,
  companyAddress: String,
  scannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model name is 'User'
    required: true
  }
}, { timestamps: true });

const HomeModel = mongoose.model("Home", homeSchema);
export default HomeModel;
