import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Box, Button, Card, CardActions, CardContent, Checkbox,Container,Typography } from '@mui/material';
import prisma from "@/utils/prismadb";
import Buttons from "@/components/modules/Buttons";
import { fetchTodo } from "@/actions/todo";

// const TodoDetail = async({params:{todoId}}) => {
//     // console.log(todoId)
//     const session=await getServerSession(authOptions)
//     if (!session) {
//         redirect('/SignIn')
//     }

//     const todo = await prisma.todo.findUnique({
//         where:{
//             id:todoId
//         }
//     })
//     return (
//         <Container maxWidth="lg"  dir="rtl" className=" *:p-3 p-10  min-h-fit  my-12">
//             <Card sx={{ maxWidth: '100%' }}>
//                 <CardContent>

//                 <Typography variant="h6" color="secondary">
//                     {todo.body}
//                 </Typography>
//                 </CardContent>
//                 <CardActions dir="ltr" >
//                     <Buttons todo={todo}/>
//                 </CardActions>
//             </Card>
//         </Container>
//     );
// }

// export default TodoDetail;

const TodoDetail = async({params:{todoId}}) => {
    // console.log(todoId)
    const session=await getServerSession(authOptions)
    if (!session) {
        redirect('/SignIn')
    }
    
    const todo = await fetchTodo(todoId)
    // console.log(todo)
    return (
        <Container maxWidth="lg"  dir="rtl" className=" *:p-3 p-10  min-h-fit  my-12">
            <Card sx={{ maxWidth: '100%' }}>
                <CardContent>

                <Typography variant="h6" color="secondary">
                    {todo.body}
                </Typography>
                </CardContent>
                <CardActions dir="ltr" >
                    <Buttons todo={todo}/>
                </CardActions>
            </Card>
        </Container>
    );
}

export default TodoDetail;