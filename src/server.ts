import { createServer } from "http";
const mongoose = require("mongoose");
import { router } from "./routes/blogRoutes"

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/week-3",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: Error) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const server = createServer((req, res) => {
  try {
    router(req, res)
  } catch (err) {
    if (err) {
      console.error(err)
    }
  }
})

const PORT = process.env.PORT || 4040

server.listen(PORT, ()=>  console.info(`server is running on http://localhost:${PORT}/api/blog`)) 