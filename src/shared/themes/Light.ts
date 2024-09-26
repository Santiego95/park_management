import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#FF740F',
            dark: '#924207',
            light: '#F68B3D',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#40BB14',
            dark: '#329A0D',
            light: '#58DA2A',
            contrastText: '#ffffff',
        },
        background:{
            default: '#F5F5F5',
            paper: '#FFFFFF',
        }
    }
});