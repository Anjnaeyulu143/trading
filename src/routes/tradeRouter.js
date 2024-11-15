const express = require("express");
const tradeModel = require("../models/TradeSchema");
const strategyModel = require("../models/StrategySchema");

const router = express.Router();

// Add trade details to the specified strategy

const tradeDetailsRouter = router.post(
  "/trade-details/:id",
  async (req, res) => {
    console.log(req.body);

    const {
      stockName,
      isExecutedSameStrategy,
      isUsedSameRisk,
      outcome,
      exited,
      isPartial,
    } = req.body;

    const id = req.params.id;

    try {
      const newTrade = new tradeModel({
        stockName,
        isExecutedSameStrategy,
        isUsedSameRisk,
        outcome,
        exited,
        ...(exited === "partial" && { isPartial }),
      });

      await newTrade.save();

      await strategyModel.findByIdAndUpdate(
        id,
        { $push: { executedTrades: newTrade._id } },
        { new: true }
      );

      res.status(201).send("Trade details added successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("something went wrong");
    }
  }
);

// Create a new Strategy

const createNewStrategy = router.post("/new-strategy", async (req, res) => {
  console.log("Yeah! Successfully created new strategy");

  const { strategyName, riskToReward } = req.body;

  try {
    const newStrategy = new strategyModel({
      strategyName,
      riskToReward,
      status: "inProgress",
    });

    await newStrategy.save();
    res.status(201).send("New Strategy created successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while creating new strategy:" + err.message);
  }
});

module.exports = {
  tradeDetailsRouter,
  createNewStrategy,
};
