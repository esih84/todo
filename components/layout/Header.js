'use client'
import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/Search';

import useTodo from '@/hooks/useAddTodo';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ColorModeContext } from './Layout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchHandler=(term)=>{
    // console.log(term)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);

  }

  const addModal =  useTodo()

  return (
    <Box sx={{ flexGrow: 1  }}>
      <AppBar dir="rtl"  position="static">
        <Toolbar>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            یادداشت
          </Typography>
          <Search

          >
            <SearchIconWrapper>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="جست وجو"
              onChange={e=>searchHandler(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
              // inputProps={{ 'aria-label': 'search' }}
            />
              <SearchIcon sx={{marginLeft:'10px'}} />
          </Search>
          
          <Box sx={{ flexGrow: 1, display:{xs:'none', sm:"block"} }} />
          <Box sx={{ display: 'flex'  }}>
            <IconButton size="large" aria-label="show 4 new mails" onClick={addModal.onOpen} color="inherit">
                <AddCircleRoundedIcon />
            </IconButton>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

    </Box>
  );
}
