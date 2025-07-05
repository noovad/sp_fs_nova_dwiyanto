import express from "express";
import registerRoutes from "./routes/routes";
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler.middleware";
import { createServer } from "http";
import { initSocket } from "./configs/socket";
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);

app.use(cors({
  origin: process.env.FE_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

registerRoutes(app);
app.use(errorHandler);


const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});