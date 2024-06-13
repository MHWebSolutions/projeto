import React from "react";
import { Switch } from "react-router-dom";
import Login from '../pages/Login'
import CadastroAlunos from "../pages/CadastroAlunos";
import CadastroUsers from "../pages/CadastroUsers";
import ListaAlunos from "../pages/ListaAlunos";
import FotosAlunos from "../pages/FotoAlunos";
import Page404 from "../pages/Page404";
import MyRoute from "./MyRouter";

export default function Routes(){
    return(
            <Switch>
                <MyRoute exact path="/" component={ListaAlunos} />
                <MyRoute exact path="/aluno/:id/edit" component={CadastroAlunos} isClosed />
                <MyRoute exact path="/aluno/" component={CadastroAlunos} isClosed/>
                <MyRoute exact path="/fotos/:id" component={FotosAlunos} isClosed />
                <MyRoute exact path="/login" component={Login} />
                <MyRoute exact path="/register" component={CadastroUsers} />
                <MyRoute path="*" component={Page404}/>
            </Switch>
    )
}