'use client'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toaster } from 'react-hot-toast';
const DialogBase = ({title,open, onClose, value, onChange,submitHandler,buttonText}) => {
    return (
        <Dialog  dir='rtl' maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle color='secondary'>{title}</DialogTitle>
        <DialogContent>

          <TextField
            
            autoFocus
            margin="dense"
            id="todo"
            value={value}
            onChange={onChange}
            // label="Email Address"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onClose}>انصراف</Button>
          <Button color='info'  variant="outlined" onClick={submitHandler}>{buttonText}</Button>
        </DialogActions>
        <Toaster/>
      </Dialog>
    );
}

export default DialogBase;