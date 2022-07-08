const mongoose = require("mongoose");
const WorkoutPlanDraftSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
    },
    exercises: {
      type: [Object],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlanDraft", WorkoutPlanDraftSchema);
