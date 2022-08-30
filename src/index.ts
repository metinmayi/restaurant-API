import express from "express";
import cors from "cors";
import "dotenv/config";
import AuthorizeRouter from "./routes/AuthorizeRouter";
import BookingsRouter from "./routes/BookingsRouter";
const server = express();

server.use(cors());
server.use(express.json());

server.use("/authorize", AuthorizeRouter);
server.use("/bookings", BookingsRouter);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
