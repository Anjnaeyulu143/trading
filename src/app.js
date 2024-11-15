const express = require("express");
const { connectDB } = require("./config/database");
const {
  tradeDetailsRouter,
  createNewStrategy,
} = require("./routes/tradeRouter");
const app = express();
app.use(express.json());

app.use("/api/v1", tradeDetailsRouter);
app.use("/api/v1", createNewStrategy);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1); // Exit the application with an error code 1.
  });
