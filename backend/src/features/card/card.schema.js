import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
    id: {
    type: Number,
    required: true,
    unique: true
  },
  Fname: {
    type: String,
    required: true,
    trim: true //to remove extra spacing
  },
  Lname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,  // Use String for phone numbers (to handle leading 0s, +, etc.)
    required: true
  },
  Cname: {
    type: String,
    required: true,
    trim: true
  },
  Cnumber: {
    type: String,  
    required: true
  },
  Cadd: {
    type: String,
    trim: true
  }
});
