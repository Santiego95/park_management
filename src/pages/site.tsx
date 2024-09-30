import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
export const Site = () => {
    return (
        <div>
            <Button component={Link} to="/rotativo" variant="contained" color="primary">Pagina Rotativo</Button>
            <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
            <Button component={Link} to="/cadastro" variant="contained" color="primary">Cadastro</Button>


        </div>
        
    )
}