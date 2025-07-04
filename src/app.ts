import express from "express";
import registerRoutes from "./routes/routes";
import cors from 'cors';
import { PORT } from "./configs/env";
import errorHandler from "./middlewares/errorHandler.middleware";
import { createServer } from "http";
import { initSocket } from "./configs/socket";

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);

app.use(cors());
app.use(express.json());
registerRoutes(app);
app.use(errorHandler);


httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});