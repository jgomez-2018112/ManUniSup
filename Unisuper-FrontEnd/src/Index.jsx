import App from "./App";
import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { InfraPage } from "./pages/InfraPage/InfraPage";
import { SACPage } from "./pages/SacPage/SACPage";
import { UsuariosInfra } from "./pages/InfraPage/UsuariosPage/Usuariospage";
import { Insert1_TiendaPage } from "./pages/TiendaPage/Insert1TiendaPage ";
import { ReporteSupPage } from "./pages/InfraPage/ReportesPage/ReporteSupPage";
import { ReporteTecPage } from "./pages/InfraPage/ReportesPage/ReporteTecPage";
import { Insert2_TiendaPage } from "./pages/TiendaPage/Insert2Tienda";
import { Insert3_TiendaPage } from "./pages/TiendaPage/Insert3Tienda";
import { Insert4_TiendaPage } from "./pages/TiendaPage/Insert4Tienda";
import { ReportesPage } from "./pages/InfraPage/ReportesPage/ReportesPage";
import { UsuariosSAC } from "./pages/SacPage/UsuariosPage/UsuariosPage";
import { InsertTiendaSAC } from "./pages/TiendaPage/InsertTiendaSAC";
import { AsigSupPageReport } from "./pages/InfraPage/UsuariosPage/AsigSupPage";
import { UpdateSupPage } from "./pages/InfraPage/UsuariosPage/UpdateSupPage";

export const AuthContext = createContext();

export const Index = ()=>{
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage></NotFoundPage>,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                /*INFRAESTRUCTURA*/ 
                {
                    path: '/INFRA',
                    element: <InfraPage></InfraPage>,
                },
                {
                    path: '/USERINFRA',
                    element: <UsuariosInfra></UsuariosInfra>  
                },
                {
                    path: '/FORM1Tienda',
                    element: <Insert1_TiendaPage></Insert1_TiendaPage> 
                },
                {
                    path: '/FORM2Tienda',
                    element: <Insert2_TiendaPage></Insert2_TiendaPage>
                },
                {
                    path:'/FORM3Tienda',
                    element: <Insert3_TiendaPage></Insert3_TiendaPage>
                },
                {
                    path: '/FORM4Tienda',
                    element: <Insert4_TiendaPage></Insert4_TiendaPage>
                },
                {
                    path: '/REPORTES',
                    element: <ReportesPage></ReportesPage>
                },
                {
                    path: '/REPORTESupervisores',
                    element: <ReporteSupPage></ReporteSupPage>
                },
                
                {
                    path: '/REPORTETecnicos',
                    element: <ReporteTecPage></ReporteTecPage>
                },
                {
                    path: '/AsigSupReport',
                    element: <AsigSupPageReport></AsigSupPageReport>
                },
                {
                    path:'/UpdateSup',
                    element: <UpdateSupPage></UpdateSupPage>
                },
                /*SAC*/
                {
                    path: '/SAC',
                    element: <SACPage></SACPage>
                },
                {
                    path: '/USERSAC',
                    element: <UsuariosSAC></UsuariosSAC>
                },
                {
                    path: '/TiendaSAC',
                    element: <InsertTiendaSAC></InsertTiendaSAC>
                }
            ]
            
        }
    ])

    return (
        <AuthContext.Provider >
            <RouterProvider router={routes}></RouterProvider>
        </AuthContext.Provider>
    )
}