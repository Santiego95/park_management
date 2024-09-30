import { Routes, Route, Navigate } from "react-router-dom";
import EstacionamentoRotativo from "../pages/estacionamentoRotativo";
import { Site } from "../pages/site";


export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/site" element ={<Site />} />
            <Route path="/paginaInicial" element ={<EstacionamentoRotativo />} />

            <Route path="*" element = {<Navigate to="paginaInicial" />} />
        </Routes>
    )
        
    
};