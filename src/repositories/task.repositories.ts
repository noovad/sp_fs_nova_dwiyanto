import prisma from "../configs/prismaClient";
import { taskRequest } from "../dto/task.dto";

export const createTask = async (data: taskRequest) => {
  return prisma.task.create({
    data,
  });
};

export const getAllTasks = async (options: {
  title?: string;
  projectName?: string;
}) => {
  const {
    title,
    projectName,
  } = options;

  const where: any = {};

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (projectName) {
    where.project = {
      title: projectName,
    };
  }


  return prisma.task.findMany({
    where,
  });
};

export const getTaskById = async (id: string) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const updateTask = async (id: string, data: taskRequest) => {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};
