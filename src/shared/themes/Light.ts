import { createTheme } from "@mui/material";
//import { dark, light } from "@mui/material/styles/createPalette";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#FF740F',
            dark: '#924207',
            light: '#F68B3D',
            contrastText: '#ffffff',
        },
        secondary: {
            main: "#ffffff",
            dark: '#924207',
            light: '#F68B3D',
            contrastText: '#FF740F'
        }
    }
});