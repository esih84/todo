// import Home from "@/components/templates/Home";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import Todos from "@/components/templates/Todo/Todos";
import PaginationButton from "@/components/modules/pagination/PaginationButton";
import { fetchTodos } from "@/actions/todo";
// import serverAuth from "@/utils/serverAuth";

export default async function Page({searchParams,searchParams:{query}}) {
  // console.log({...searchParams})

  const session = await getServerSession(authOptions)
  if (!session)redirect('/SignIn')

  const PageNumber = Number(searchParams?.page) || 1;

  const take =5
  const skip = (PageNumber-1)* take
  const {data,metadata} = await fetchTodos({take, skip})
  // console.log({data, metadata})
  return (
    <Container  maxWidth="lg" >
        <Todos todos={data} query={query}/>
        <PaginationButton {...searchParams} {...metadata} />
    </Container>
);
}
