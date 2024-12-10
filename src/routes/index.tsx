import { Routes, Route, Navigate } from "react-router-dom";
import EstacionamentoRotativo from "../pages/estacionamentoRotativo";
import Site  from "../pages/site";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import TelaDono from "../pages/telaDono";
import Relatorio from "../pages/relatorio";
import Mensalista from '../pages/paginaMensalistas';
import Senha from "../pages/recuperaSenha";

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/paginaInicial" element ={<Site />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/cadastro" element = {<Cadastro />} />
            <Route path="/paginaMensalista" element={<Mensalista />} />
            <Route path="/recuperaSenha" element={<Senha />} />
            <Route path="/rotativo/:id" element ={<EstacionamentoRotativo />} />
            <Route path="/telaDono/:id" element ={<TelaDono />} />
            <Route path="*" element = {<Navigate to="paginaInicial" />} />
            <Route path="/relatorio" element = {<Relatorio />}/>
        </Routes>
    )       
};

// import { Routes, Route, Navigate } from 'react-router-dom';
// import EstacionamentoRotativo from "../pages/estacionamentoRotativo";
// import Site  from "../pages/site";
// import Login from "../pages/login";
// import Cadastro from "../pages/cadastro";
// import TelaDono from "../pages/telaDono";
// import Relatorio from "../pages/relatorio";
// import Mensalista from '../pages/paginaMensalistas';
// import Senha from "../pages/recuperaSenha";


// const isAuthenticated = (): boolean => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp * 1000 > Date.now(); // Verifica se o token ainda é válido
//   } catch (error) {
//     console.error('Erro ao validar token', error);
//     return false;
//   }
// };

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/paginaInicial" element={<Site />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/cadastro" element={<Cadastro />} />
//       <Route path="/paginaMensalista" element={<Mensalista />} />
//       <Route path="/recuperaSenha" element={<Senha />} />
      
//       {/* Verifica se o usuário está autenticado antes de renderizar as rotas protegidas */}
//       <Route
//         path="/rotativo/:id"
//         element={isAuthenticated() ? <EstacionamentoRotativo /> : <Navigate to="/login" replace />}
//       />
//       <Route
//         path="/telaDono/:id"
//         element={isAuthenticated() ? <TelaDono /> : <Navigate to="/login" replace />}
//       />
//       <Route
//         path="/relatorio"
//         element={isAuthenticated() ? <Relatorio /> : <Navigate to="/login" replace />}
//       />

//       {/* Redireciona para a página inicial caso a URL não exista */}
//       <Route path="*" element={<Navigate to="/paginaInicial" />} />
//     </Routes>
//   );
// };
