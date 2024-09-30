import { Routes, Route, Navigate } from "react-router-dom";
import EstacionamentoRotativo from "../pages/estacionamentoRotativo";
import { Site } from "../pages/site";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";



export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/paginaInicial" element ={<Site />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/cadastro" element = {<Cadastro />} />
            <Route path="/rotativo" element ={<EstacionamentoRotativo />} />

            <Route path="*" element = {<Navigate to="paginaInicial" />} />
        </Routes>
    )
        
    
};