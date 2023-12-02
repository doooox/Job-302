import { createApp } from "./app/app.js";
import { config } from "dotenv";
config();

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
