'use client'
import Buttons from '@/components/modules/Buttons';

import { shortener } from '@/utils/function';
import { Box ,Checkbox,Typography } from '@mui/material';
import Link from 'next/link';

const Todo = ({todo}) => {

    return (
    <Box display="flex" alignItems="center" gap='5px' marginY="8px">
    {/* <Checkbox  /> */}
    <Typography variant="a" sx={{ flexGrow: 1, mr: '16px', textDecoration:  'none' }}>
    <Link href={`/todo/${todo.id}`}>
      {shortener(todo.body)}
    </Link>
    </Typography>
    <Buttons todo={todo}/>

    </Box>
    );
}

export default Todo;


//   // checked={completed} onChange={() => onToggle(id)}
//   // textDecoration: completed ? 'line-through' : 'none'

//   //   <ListItem
//   //   // key={value}
//   //   secondaryAction={
//   //     <IconButton edge="end" aria-label="comments">
//   //       {/* <CommentIcon /> */}
//   //     </IconButton>
//   //   }
//   //   disablePadding
//   // >
//   //   <ListItemButton dense>
//   //     <ListItemIcon>
//   //       <Checkbox
//   //         edge="start"
//   //       //   checked={checked.indexOf(value) !== -1}
//   //         tabIndex={-1}
//   //         disableRipple
//   //       //   inputProps={{ 'aria-labelledby': labelId }}
//   //       />
//   //     </ListItemIcon>
//   //     <ListItemText >{todo.body}</ListItemText>
//   //   </ListItemButton>
//   // </ListItem>
