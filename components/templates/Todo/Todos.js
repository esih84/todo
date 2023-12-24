import { Container } from "@mui/material";
import Todo from "./Todo";

const Todos =async ({query,todos}) => {
    

  if (query) {
    todos = todos.filter(todo=>todo.body === query)
  } 
  if (todos.length <1) {
    return(
      <div dir="rtl" className=" *:p-3  flex justify-center  p-10 shadow-lg rounded-md   min-h-32  my-12">

          <h3 className=" text-sky-500"> یادداشتی وجود ندارد</h3>
      </div>

    )
  }
    console.log(todos.length)
    return (
        // max-h-96
        <Container dir="rtl" className=" *:pb-3 *:border-b  p-10 shadow-lg rounded-md   min-h-32  my-12">
            {todos.map(todo=>(
                <Todo todo={todo} key={todo.id}/>
            ))}
        </Container>
    );
}

export default Todos;