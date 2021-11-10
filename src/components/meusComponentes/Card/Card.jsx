import { Button } from 'primereact/button'
import React from 'react'
import './Card.css'
import fotoNutri from "../../../assets/defaultNutri.png"
import fotoAdmin from "../../../assets/defaultAdmin.png"
import fotoPaciente from "../../../assets/defaultPaciente.png"
// import fotoPaciente from "../../../assets/defaultNutri.png"
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


export default function Card(props) {

    let foto = carregarFotoDefault()
    
    function carregarFotoDefault(){
        switch (props.tipoCard) {
            case "nutri":
                return fotoNutri
            case "admin":
                return fotoAdmin
            case "paciente":
                return fotoPaciente
            default:
                break;
        }
    }

    async function excluir(){
        const endpoint = props.tipoCard==="nutri"?"nutricionista": props.tipoCard==="admin"? "admin":"paciente"
        if(window.confirm(`Tem certeza que deseja excluir o usuário: ${props.nome}?`)){
            await api.delete(`http://localhost:8080/api/${endpoint}/${props.id}`)
            .then((response)=>{
                window.location.reload()
                console.log(response.data)
                alert("Excluido com sucesso!")
                
            })
            .catch((error) =>{
                alert("Erro ao excluir este usuário!")
                console.log(`error: ${error}`)

            })
        }
    }
    


    return (

        <div className="nutriapp-card" key={props.id}>
            <div className="divFoto">
                <img src={props.foto || foto} alt="foto" className="foto"/>
            </div>

            <div className="info1">
                <label className="nome">Nome: <p>{props.nome || "Fulano"}</p></label>
                <label className="dtNascimento">Data Nasc.: <p>{format(new Date(props.dtNasc), 'dd/MM/yyyy') ||"12/12/2000"}</p></label>
                <label className="genero">Gênero: <p>{props.genero ||"Outro"}</p></label>
            </div>

            <div className="info2">
                
                <label className="telefone">Telefone: <p>{props.tel ||"(83) 9 9978-2578"}</p></label>
                <label className="email">E-mail: <p>{props.email ||"fulano@email.com"}</p></label>
                { props.tipoCard==="nutri"?<label className="crn">CRN: <p> {props.crn ||"1 23456/x"} </p></label> :
                 props.tipoCard==="paciente"?<label className="cidade">Cidade: <p> {props.residencia ||"1 23456/x"} </p></label> :""}

            </div>

            <div className="botoes">
                <div className='btGrande'>
                    <Button id="btDesempenho" label="DESEMPENHO" icon="pi pi-chart-line" iconPos="left" data-toggle="tooltip" title={`Ver desempenho de ${props.nome}`}/>
                    <Button id="btEmail" label="E-MAIL" icon="pi pi-envelope" iconPos="left" data-toggle="tooltip" title={`Enviar e-mail para ${props.nome}`} />
                </div>

                <div className='btPequeno'>
                    <Link to={props.tipoCard==="nutri"? (`perfilNutri/${props.id}`) : props.tipoCard==="admin"? (`perfilAdmin/${props.id}`):(`perfilPaciente/${props.id}`)}> <Button id="btPerfil"  icon="pi pi-user" iconPos="left" data-toggle="tooltip" title="Editar" /> </Link>
                    <Button id="btApagar"  icon="pi pi-user-minus" iconPos="left" onClick={excluir} data-toggle="tooltip" title="Excluir"/>
                </div>
            </div>

        </div>
    )

}