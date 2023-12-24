"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prismadb";
import { redirect } from "next/navigation";

export const deleteTodo = async (id) => {
     await prisma.todo.delete({ where: { id } });
     redirect('/')
};


export const editTodo = async (id,body) => {
    await prisma.todo.update({ where: { id }, data: { body:body } });
    revalidatePath("/");
};