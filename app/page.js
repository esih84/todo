// import Home from "@/components/templates/Home";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Container, Pagination } from "@mui/material";
import Todos from "@/components/templates/Todo/Todos";
import PaginationButton from "@/components/modules/pagination/PaginationButton";
import serverAuth from "@/utils/serverAuth";

export default async function Page({searchParams,searchParams:{query}}) {
  // console.log(query)
  const session = await getServerSession(authOptions)
  if (!session)redirect('/SignIn')

  const {currentUser}=await serverAuth()
  let  todos = await prisma.todo.findMany({
    where: {
      userId: currentUser?.id
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPage = Math.ceil( todos.length/5)
  // console.log(totalPage)
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Container maxWidth="lg" >
        <Todos todos={todos} query={query}/>
        <PaginationButton totalPage={totalPage} />
    </Container>
);
}
