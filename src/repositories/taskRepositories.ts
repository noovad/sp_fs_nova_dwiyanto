import prisma from "../configs/prismaClient";
import { taskRequest, taskUpdate } from "../dto/task.dto";

export const createTask = async (data: taskRequest) => {
  return prisma.task.create({
    data,
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getAllTasks = async (options: {
  projectId: string;
}) => {
  const {
    projectId,
  } = options;
  return prisma.task.findMany({
    where: {
      projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const updateTask = async (id: string, data: taskUpdate) => {
  return prisma.task.update({
    where: {
      id,
    },
    data,
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};