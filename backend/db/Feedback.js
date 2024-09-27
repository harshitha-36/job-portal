const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Assuming there is a User model to reference
      required: true,
      unique: true,  // Each user should only have one feedback entry
    },
    feedbackDetails: {
      filteringProcessFeedback: {
        type: String,
        maxlength: 500,
        trim: true,
      },
      improvementSuggestions: {
        type: String,
        maxlength: 500,
        trim: true,
      },
      jobPostingNotifications: {
        type: String,
        maxlength: 500,
        trim: true,
      },
      personalRecommendations: {
        type: String,
        maxlength: 500,
        trim: true,
      },
      userInterfaceExperience: {
        type: String,
        maxlength: 500,
        trim: true,
      },
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    collation: { locale: "en" },  // Collation for sorting and comparisons
  }
);

// Ensure each user only has one feedback entry
schema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", schema);
