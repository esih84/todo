import Todo from "./Todo";
import serverAuth from "@/utils/serverAuth";
import prisma from "@/utils/prismadb";

const Todos =async ({query,todos}) => {
    

  if (query) {
    todos = todos.filter(todo=>todo.body === query)
  } 

    // console.log(todos)
    return (
        // max-h-96
        <div dir="rtl" className=" *:pb-3 *:border-b  p-10 shadow-lg rounded-md   min-h-32  my-12">
            {todos.map(todo=>(
                <Todo todo={todo} key={todo.id}/>
            ))}
        </div>
    );
}

export default Todos;