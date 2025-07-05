import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as projectMemberService from "../services/projectMemberServices";
import { HttpResponse } from "../utils/httpResponse";
import { getIO, getSocketIdByUserId } from "../configs/socket";

export const createProjectMember = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const member = await projectMemberService.createProjectMember(req.body, userId);
        const socketId = getSocketIdByUserId(req.user?.userId);
        getIO().except(socketId).emit("projectMember:created", member);
        res.status(201).json(
            HttpResponse.CREATED('Project member added successfully', member)
        );
    }
);

export const getAllProjectMembers = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.query;
        const members = await projectMemberService.getAllProjectMembers(
            projectId as string
        );
        res.status(200).json(
            HttpResponse.OK('Project members retrieved successfully', members)
        );
    }
);

export const deleteProjectMember = asyncHandler(
    async (req: Request, res: Response) => {
        await projectMemberService.deleteProjectMember(req.params.id);
        const socketId = getSocketIdByUserId(req.user?.userId);
        getIO().except(socketId).emit("projectMember:deleted", { memberId: req.params.id });
        res.status(200).json(
            HttpResponse.OK('Project member removed successfully')
        );
    }
);
