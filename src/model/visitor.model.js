import mongoose from "mongoose";

export const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    purpose: {
      type: String,
      default: null,
    },
    checkInTime: {
      type: Date,
      default: null,
    },
    checkInPhoto: {
      type: String,
      default: null,
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
    checkOutPhoto: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    unitNo: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    peopleCount: {
      type: Number,
      default: 0,
    },
    project: {
      type: String,
      default: null,
    },
    wing:{
      type:String,
      default:null,
    }
  },
  { timestamps: true },
);

const visitorModel = mongoose.model(
  "visitor",
  visitorSchema,
  "visitor",
);
export default visitorModel;
