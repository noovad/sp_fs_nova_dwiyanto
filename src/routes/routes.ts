import express from "express";
import taskRoute from "./taskRoute";
import userRoute from "./userRoute";
import projectRoute from "./projectRoute";
import projectMemberRoute from "./projectMemberRoute";

export default function registerRoutes(app: express.Application) {
    app.use('/', taskRoute);
    app.use('/', userRoute);
    app.use('/', projectRoute);
    app.use('/', projectMemberRoute);
    app.use((req, res) => {
        res.status(404).json({
            message: `Cannot find ${req.originalUrl} on this server`,
        });
    });
}
