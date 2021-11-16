import {Button} from "primereact/button"
import React from "react"
import { Link } from "react-router-dom"

import "./MenuTratamento.css"



export default function MenuTratamento(props){

    const tab = props.tab || 1;

    return(
        <>
            <div className="menuTratamento">
                <div className="texto">
                    <label className="paciente">Paciente</label>
                    <Link to={`/paciente/${props.id}`}> <p className="nomePaciente">{props.nome+ " " +props.sobreNome}</p> </Link>
                    <label className="paciente">Detalhes</label>
                    <p className="nomePaciente">{props.nome} nasceu em data, e aqui vai ficar toda a informação necessaria para compor os detalhes. O(A) paciente esta sendo acompanhada desde data. Sua última consulta foi em data.</p>
                </div>

                <div className="botoes">
                    <Button name="tratamento"style={tab===1? {backgroundColor:"white",color:"#22b2aa"}: ""}>Resumo</Button>
                    <Button name="outra coisa">Anamnese</Button>
                    <Button name="antropemetrica">Avaliação Antropemetrico</Button>
                    <Button name="exames">Exames</Button>
                    <Button name="gastoEnergetico">Gasto Energetico</Button>
                    <Button name="planoAlimentar">Plano Alimentar</Button>
                    <Button name="recordatorioAlimentar">Recordatorio Alimentar</Button>
                    <Button name="suplementacao">Suplementação</Button>
                </div>
            </div>
        </>
    )
}
