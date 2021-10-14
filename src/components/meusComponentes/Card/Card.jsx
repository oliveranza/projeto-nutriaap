import { Button } from 'primereact/button'
import React from 'react'
import './Card.css'
import foto from "../../../assets/defaultNutri.png"
import api from '../../../services/api'


export default function Card(props) {

    async function excluir(){
        console.log(props.id)
        if(window.confirm('Tem certeza que deseja excluir esse usuário?')){
            api.delete(`http://localhost:8080/api/nutricionista/${props.id}`)
            .then((response)=>{
                console.log(response.data)
                alert("Excluido com sucesso!")
                window.location.reload()
            })
        }
    }
    


    return (

        <div className="nutriapp-card">
            <div className="divFoto">
                <img src={props.foto || foto} alt="foto" className="foto"/>
            </div>

            <div className="info1">
                <label className="nome">Nome: <p>{props.nome || "Fulano"}</p></label>
                <label className="dtNascimento">Data Nasc.: <p>{props.dtNasc ||"11/10/2000"}</p></label>
                <label className="genero">Gênero: <p>{props.genero ||"Outro"}</p></label>
            </div>

            <div className="info2">
                <label className="crn">CRN: <p> {props.crn ||"1 23456/x"}</p></label>
                <label className="telefone">Telefone: <p>{props.tel ||"(83) 9 9978-2578"}</p></label>
                <label className="email">E-mail: <p>{props.email ||"fulano@email.com"}</p></label>

            </div>

            <div className="botoes">
                <div className='btGrande'>
                    <Button id="btDesempenho" label="DESEMPENHO" icon="pi pi-chart-line" iconPos="left" />
                    <Button id="btEmail" label="E-MAIL" icon="pi pi-envelope" iconPos="left" />
                </div>

                <div className='btPequeno'>
                    <Button id="btPerfil"  icon="pi pi-user" iconPos="left" />
                    <Button id="btexcluir"  icon="pi pi-user-minus" iconPos="left" onClick={excluir}/>
                </div>
            </div>


        </div>
    )

}