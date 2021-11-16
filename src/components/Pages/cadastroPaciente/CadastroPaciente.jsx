import "./CadastroPaciente.css"
import 'primeflex/primeflex.css';

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';


import foto from "../../../assets/defaultUser.png"

import { addLocale } from 'primereact/api';
import api from "../../../services/api";




function CadastroPaciente() {

  //pegar o di da url
  const {id} = useParams()
  
  //usa o historico de navegação
  const history = useHistory();
  
  //carrega os dados do nutri no caso de update
  useEffect(()=>{
    if(id!= null){
      api.get(`http://localhost:8080/api/paciente/${id}`)
      .then(res =>{
        const userPerfil = res.data
        console.log(userPerfil)
        setNome(userPerfil.nome)
        setSobreNome(userPerfil.sobreNome)
        setData(new Date(userPerfil.dataNasc))
        setGenero({label:userPerfil.genero})
        setEmail(userPerfil.email)
        setCell(userPerfil.cell)
        setCpf(userPerfil.cpf)
        setEndereco(userPerfil.rua)
        setBairro(userPerfil.bairro)
        setCidade(userPerfil.cidade)
        setUF(userPerfil.estado)
        setStatus(userPerfil.status)
       
    })}  
  },[])

  //states
  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [dataNasc, setData] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState(Number);
  const [genero, setGenero] = useState("");
  const [UF, setUF] = useState("");
  const [cidade, setCidade] =useState("")
  const [bairro, setBairro] =useState("")
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [status, setStatus] = useState(Boolean);
  // const [senha, setSenha] = useState("");
  // const [senha2, setSenha2] = useState("");
 
  
  //lista de opções do combobox genero
  const generos = [
    { label: "Masculino" },
    { label: "Feminino" },
    { label: "Outro" },
    { label: "Prefere Não declarar" },
  ]

  //lista de opções de status
  const statuss = [
    { label: "Ativo", value:true},
    { label: "Inativo", value:false}
  ]
  
  
  /*=================================calendário ===================================//
  * configurações necessárias para o calendário que seleciona a data de nascimento
  */
  addLocale('pt-br', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out', 'Nov', 'Dec'],
    today: 'Hoje',
    clear: 'Claro'
  });
  

  //metodo de salva, cria novo ou atualiza se for o caso
  async function Salvar(e) {
    e.preventDefault()
    // if(senha!=senha2){
    //   alert("A senha deve ser igual nos dois campos")
    //   setSenha("")
    //   setSenha2("")
    //   return
    // }
    const gen = genero.label
    
    const usuario = {
      nome: nome,
      sobreNome: sobreNome,
      dataNasc: dataNasc,
      email: email,
      cell: cell,
      genero: gen,
      estado: UF,
      cidade: cidade,
      bairro: bairro,
      rua: endereco,
      cpf: cpf,
      senha: cpf,
      status: status
    }

    let flag = false
    if(id != null){
      flag = atualizar(e,usuario)
    }else{
      flag = Novo(e,usuario)
    }

    if(flag){
      alert("Operação realizada com sucesso!")
      history.push('/listaPaciente')
    }else{
      alert(`oops! ocorreu um erro. tente novamente mais tarde`)
    }
    window.location.reload()
}


//metodo que cria um novo usuario
async function Novo(e, usuario) {
  e.preventDefault()
  await api.post("http://localhost:8080/api/paciente", usuario)
    .then(response => {
      console.log(response)
    })
    .catch(error=> {
      console.log("oops! ocorreu um erro. " + error)
  })

}


//metodo que atualiza um usuario existente
async function atualizar(e, usuario) {
  e.preventDefault()
  usuario.id=id
  await api.put("http://localhost:8080/api/paciente", usuario)
    .then(response => {
      console.log(response)
    })
    .catch(error=> {
      console.log("oops! ocorreu um erro. " + error)
  })

}


  //renderização da paginas
  return (
    <div className="nutriapp-cadastropaciente">
      <BarraDeMenu tab={1} tipo="nutri" />
      <div className="nutriapp-cadastropaciente-inicio">
       
        <div className="ladoEsquerdo">
          <div className="foto">
            {image ? <img id="lbFoto" src={URL.createObjectURL(image)} alt="imagem"/> : <img id="lbFoto" src={foto} style={{width:"60%", height:"60%"}} alt="imagemDefault"/>}
          </div>

          <div className="divBt1">
            <FileUpload id="bt1" type="file" mode="basic" auto accept="image/*" name="imagem" maxFileSize={10000000}  customUpload uploadHandler={e => setImage(e.files.pop())} chooseLabel="Escolher" />
            <Button type="submit" id="bt2" label="Remover" icon="pi pi-minus" iconPos="left" onClick={e => setImage("")}></Button>
          </div>
         
          <div className='outrosBts'>
            <Link to={`./tratamento/${id}`}><Button id="btTratamento" label="TRATAMENTO" icon="pi pi-heart" iconPos="left" data-toggle="tooltip" title={`Ver tratamento de ${nome}`}/></Link>
            <Button id="btEmail" label="E-MAIL" icon="pi pi-envelope" iconPos="left" data-toggle="tooltip" title={`Enviar e-mail para ${nome}`} />
          </div>


        </div>


        <div className="ladoDireito">
          <form onSubmit={Salvar}>

            <div className="p-fluid p-formgrid p-grid">

              <div className="p-field p-col-6">
                <label htmlFor="firstname2">Nome</label>
                <InputText id="firstname2"  type="text" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required minLength="2" maxLength="25"/>
                <span class="validity"/>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="lastname2">Sobrenome</label>
                <InputText id="lastname2" type="text" placeholder="Digite o sobrenome" value={sobreNome} onChange={e => setSobreNome(e.target.value)} required minLength="2" maxLength="80"/>
              </div>

              <div className="p-field  p-col-12 ">
                <label htmlFor="datanascimento">Data de Nascimento</label>
                <Calendar id="datanascimento" value={dataNasc} dateFormat="dd/mm/yy" locale='pt-br' monthNavigator yearNavigator mask="99/99/9999"
                  yearRange="1920:2021" placeholder={"Data de Nascimento"} showIcon icon="pi pi-calendar" onChange={e => setData(e.target.value)} required/>
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="genero">Gênero</label>
                <Dropdown inputId="genero" value={genero} options={generos} onChange={e => setGenero(e.target.value)} placeholder="Selecione" required/>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="email">E-mail</label>
                <InputText id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite o e-mail" required maxLength="80"/>
              </div>
              
              <div className="p-field p-col-6 ">
                <label htmlFor="phone">Telefone</label>
                <InputMask id="phone" value={cell} onChange={e => setCell(e.value)} mask="99 9 9999-9999" type="tel" placeholder="99-9999-9999" required></InputMask>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="cpf">CPF</label>
                <InputText id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} type="number" placeholder="Digite o cpf" step="1" required minLength="11" maxLength="11"/>
              </div>

              {/* <div className="p-field p-col-6">
                <label htmlFor="senha">Senha</label>
                <InputText id="senha" value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Crie uma senha" required minLength="8" maxLength="32"/>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="senha2">Confirme a senha</label>
                <InputText id="senha2" value={senha2} onChange={e => setSenha2(e.target.value)} type="password" placeholder="Repita a senha" required minLength="8" maxLength="32"/>
              </div> */}

              <div className="p-field p-col-6">
                <label htmlFor="endereco">Endereço</label>
                <InputText id="endereco" value={endereco} onChange={e => setEndereco(e.target.value)} type="text" placeholder="Ex.: Rua Augusta Santos, 43" required/>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="Bairro">Bairro</label>
                <InputText id="bairro" value={bairro} onChange={e => setBairro(e.target.value)} type="text" placeholder="Ex.: Centro" required/>
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="cidade">Cidade</label>
                <InputText id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} type="text" placeholder="Ex.: João Pessoa" required/>
              </div>

              <div className="p-field p-col-6 ">
                <label htmlFor="UF">UF</label>
                (<InputText id="UF" value={UF} onChange={e => setUF(e.target.value.toUpperCase())} type="text" placeholder="Ex.: PB" required maxLength="2" />
              </div>

              <div className="p-field p-col-6 ">
                <label htmlFor="status">Status</label>
                <Dropdown inputId="status" value={status} options={statuss} onChange={e => setStatus(e.target.value)} placeholder="Selecione" required/>
              </div>

                            

            </div>
            <div className="p-d-flex p-jc-between">
              <Link to="/listaPaciente">
                <Button type="button" id="bt2"  label="Voltar" icon="pi pi-arrow-left" iconPos="left" />
              </Link>
                <Button type="submit" id="bt" label="Salvar" icon="pi pi-save" iconPos="left" autoFocus></Button>
            </div>
          </form>

        </div>

      </div>

    </div>



  );
}
export default CadastroPaciente