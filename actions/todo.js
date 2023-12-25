"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prismadb";
import { redirect } from "next/navigation";
import serverAuth from "@/utils/serverAuth";

export const deleteTodo = async (id) => {
     await prisma.todo.delete({ where: { id } });
     redirect('/')
};


export const editTodo = async (id,body) => {
    await prisma.todo.update({ where: { id }, data: { body:body } });
    revalidatePath("/");
};

export const fetchTodos = async({take=5, skip=0})=>{
  try {
    const {currentUser}=await serverAuth()
    let  todos = await prisma.todo.findMany({
      where: {
        userId: currentUser?.id
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    const total = await prisma.todo.count({
        where:{
            userId: currentUser?.id
        }
    })
    revalidatePath('/')
    return {
      data : todos,
      metadata:{
          hasNextPage: skip + take <total,
          totalPage : Math.ceil(total/take)
      }
  }
  } catch (error) {
    throw new Error('مشکلی پیش آمده است')
  }



}