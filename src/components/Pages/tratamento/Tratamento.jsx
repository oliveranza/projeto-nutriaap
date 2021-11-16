import "./Tratamento.css";
import 'primeflex/primeflex.css';

import { useEffect, useState } from "react";
import BarraDeMenu from "../../meusComponentes/BarraDeMenu/BarraDeMenu";
import { Button } from "primereact/button";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";
import MenuTratamento from "../../meusComponentes/menuTratamento/MenuTratamento";

export default function Tratamento(){

    const {id} = useParams();
    
    const [nome, setNome] = useState("")
    const [sobreNome, setSobrenome] = useState("")
    
    useEffect(() =>{
     api.get(`/api/paciente/${id}`)
     .then(res =>{
         const paci = res.data;
         setNome(paci.nome);
         setSobrenome(paci.sobreNome);
     })
     .catch(erro=>{console.log(erro)})
    },[id])

    return(
      <div className="nutriapp-tratamento">
        <BarraDeMenu tab={1} tipo="nutri"/>
        
        <div className="corpo">
            
            <div className="ladoEsquerdo">
                <MenuTratamento nome={nome} sobreNome={sobreNome} id={id} />
            </div>
            
            <div className="ladoDireito">
                <div className="formulario">
                    lado direito
                </div>
            </div>


        </div>

      
      </div>
    )
}