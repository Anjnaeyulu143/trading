const mongoose = require("mongoose");

const strategySchema = new mongoose.Schema(
  {
    strategyName: {
      type: String,
      required: true,
    },
    riskToReward: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["inProgress", "completed"],
      default: "inProgress",
      required: true,
    },
    executedTrades: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TradeDetails" },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

strategySchema.pre("save", async function (next) {
  if (this.executedTrades.length >= 100 && this.status === "inProgress") {
    this.status = "completed";
    this.completedAt = Date.now();
  }

  next();
});

const strategyModel = mongoose.model("Strategy", strategySchema);
module.exports = strategyModel;
