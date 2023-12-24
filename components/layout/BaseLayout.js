'use client'
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useMemo, useState } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, blue, deepOrange, green, grey, red } from '@mui/material/colors';
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const BaseLayout = ({children}) => {
    const [mode, setMode] = useState('light');
    
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
            ...(mode === 'light'
            ? {
                // palette values for light mode
                error: {
                    main:red[500]
                },
                info:green,
                primary:  {
                    main: '#29b5f6',
                  },
                secondary:{
                    main:'#29b5f6',
                    light:'#fff'
                },
                background: {
                    default: grey[300],
                    paper: '#fff',
  
                  },
                // divider: amber[200],
                text: {
                  primary: grey[700],

                  secondary: grey[800],
                },
                
              }
            : {
                // palette values for dark mode
                error: {
                    main:red[500]
                },
                info:{
                    main: green[900],
                  },
                primary:  {
                    main: '#29b5f6',
                  },
                secondary:{
                    main:grey[900],
                    light:'black'
                },
                background: {
                  default: grey[600],
                  paper: grey[400],

                },
                text: {
                  primary: '#fff',
                  secondary: grey[500],
                },
              }),
          },
        }),
      [mode],
    );
    return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <SessionProvider>
            {children}
        </SessionProvider>
        </ThemeProvider>
    </ColorModeContext.Provider>
    );
}

export default BaseLayout;