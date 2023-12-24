'use client'
import Header from './Header';
import { createContext, useContext, useMemo, useState } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });


const Layout = ({children}) => {
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
          },
        }),
      [mode],
    );
  
    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Header/>


                            {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}

export default Layout;