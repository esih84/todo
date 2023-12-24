import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Container, Pagination } from "@mui/material";
import Todos from "./Todo/Todos";
import PaginationButton from "../modules/pagination/PaginationButton";
const Home = async() => {
    const session = await getServerSession(authOptions)
    if (!session)redirect('/SignIn')
    return (
        <Container maxWidth="lg" >
            <Todos/>
            <PaginationButton />
        </Container>
    );
}

export default Home;