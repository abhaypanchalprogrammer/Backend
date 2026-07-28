import "dotenv/config";

import connectDB from "./src/config/database.js";
import { app } from "./src/app.js";
import { testAi } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 8000;

testAi();
// Connect to MongoDB, then start the server
connectDB().catch((error) => {
  console.error("❌ MongoDB connection failed! Server not started.", error);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`This server is running on port number ${PORT}`);
});
