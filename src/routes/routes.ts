import express from "express";
import taskRoute from "./taskRoute";

export default function registerRoutes(app: express.Application) {
    app.use('/', taskRoute);
    app.use((req, res) => {
        res.status(404).json({
            message: `Cannot find ${req.originalUrl} on this server`,
        });
    });
}
