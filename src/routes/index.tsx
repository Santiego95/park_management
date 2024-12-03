import { Routes, Route, Navigate } from "react-router-dom";
import EstacionamentoRotativo from "../pages/estacionamentoRotativo";
import Site  from "../pages/site";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import TelaDono from "../pages/telaDono";
import Relatorio from "../pages/relatorio";

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/paginaInicial" element ={<Site />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/cadastro" element = {<Cadastro />} />
            <Route path="/rotativo/:id" element ={<EstacionamentoRotativo />} />
            <Route path="/telaDono/:id" element ={<TelaDono />} />
            <Route path="*" element = {<Navigate to="paginaInicial" />} />
            <Route path="/relatorio" element = {<Relatorio />}/>
        </Routes>
    )       
};