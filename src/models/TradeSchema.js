const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    tradedDate: {
      type: Date,
      //   required: true,
    },
    stockName: {
      type: String,
      required: true,
    },
    isExecutedSameStrategy: {
      type: Boolean,
      required: true,
    },
    isUsedSameRisk: {
      type: Boolean,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    exited: {
      type: String,
      enum: ["full", "partial"],
      required: true,
    },
    isPartial: {
      type: {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },

      required: function () {
        return this.exited === "partial";
      },
    },
  },
  { timestamp: true }
);

const tradeModel = mongoose.model("TradeDetails", tradeSchema);

module.exports = tradeModel;
