import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
export const Site = () => {
    return (
        <div>
            <Button component={Link} to="/paginaInicial" variant="contained" color="primary">Pagina Rotativo</Button>
            <Button variant="contained" color="primary">Login</Button>
            <Button variant="contained" color="primary">Cadastro</Button>


        </div>
        
    )
}