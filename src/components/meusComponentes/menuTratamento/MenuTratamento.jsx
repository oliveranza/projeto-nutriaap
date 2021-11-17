import {Button} from "primereact/button"
import React from "react"
import { Link } from "react-router-dom"

import "./MenuTratamento.css"



export default function MenuTratamento(props){

    const aba = props.aba || 1;
    const selectedStyle = {backgroundColor:"white",color:"#22b2aa"};

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
                    <Button name="tratamento" style={aba===1? selectedStyle: {}}>Resumo</Button>
                    <Button name="outra coisa"  style={aba===2? selectedStyle: {}}>Anamnese</Button>
                    <Button name="antropemetrica" style={aba===3? selectedStyle: {}}>Avaliação Antropemetrico</Button>
                    <Button name="exames" style={aba===4? selectedStyle: {}}>Exames</Button>
                    <Button name="gastoEnergetico" style={aba===5? selectedStyle: {}}>Gasto Energetico</Button>
                    <Button name="planoAlimentar" style={aba===6? selectedStyle: {}}>Plano Alimentar</Button>
                    <Button name="recordatorioAlimentar" style={aba===7? selectedStyle: {}}>Recordatorio Alimentar</Button>
                    <Button name="suplementacao" style={aba===8? selectedStyle: {}}>Suplementação</Button>
                </div>
            </div>
        </>
    )
}
