const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "name of the company must be provided."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "position must be provided."],
      maxlength: 100,
    },
    status: {
      type: String,
      required: [true, "status must be provided."],
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User must be provided."],
    },
  },
  { timestamps: true }
);

// mongoose instance function for checking /:id
jobSchema.statics.isValidJobId = function (jobId) {
  return mongoose.Types.ObjectId.isValid(jobId);
};
module.exports = mongoose.model("Job", jobSchema);
