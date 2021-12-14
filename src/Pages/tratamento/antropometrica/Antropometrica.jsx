import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';
import Tratamento from "../../../components/tratamento/Tratamento";
import { Toast } from "primereact/toast";

import "./Antropometrica.css";
import InputMedida from "../../../components/inputMedida/InputMedida";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";

export default function Antropometrica() {

  const history = useHistory();
  const { id, idAvaliacao } = useParams();
  const toast = useRef();

  const [titulo, setTitulo] = useState();
  const [data, setData] = useState(new Date());
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const [pesoIdeal, setPesoIdeal] = useState("");
  const [imc, setImc] = useState("");
  const [estado, setEstado] = useState("");
  
  const [brd, setBrd] = useState("");
  const [bre, setBre] = useState("");
  const [bcd, setBcd] = useState("");
  const [bce, setBce] = useState("");
  const [ad, setAd] = useState("");
  const [ae, setAe] = useState("");
  const [pd, setPd] = useState("");
  const [pe, setPe] = useState("");
  const [pesc, setPesc] = useState("");
  const [omb, setOmb] = useState("");
  const [peit, setPeit] = useState("");
  const [cint, setCint] = useState("");
  const [abd, setAbd] = useState("");
  const [quad, setQuad] = useState("");
  const [pantd, setPantd] = useState("");
  const [pante, setPante] = useState("");
  const [cd, setCd] = useState("");
  const [ce, setCe] = useState("");
  const [cpd, setCpd] = useState("");
  const [cpe, setCpe] = useState("");

  addLocale("pt-br", pt);

  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        const dt = new Date(avali.data);
        setTitulo(avali.titulo);
        setData(dt);
        setPeso(avali.peso);
        setAltura(avali.altura);
        setBrd(avali.bracoDireitoRelaxado)
        setBre(avali.bracoEsquerdoRelaxado)
        setBcd(avali.bracoDireitoContraido)
        setBce(avali.bracoEsquerdoContraido)
        setAd(avali.antebracoDireito)
        setAe(avali.antebracoEsquerdo)
        setPd(avali.punhoDireito)
        setPe(avali.punhoEsquerdo)
        setPesc(avali.pescoco)
        setOmb(avali.ombro)
        setPeit(avali.peitoral)
        setCint(avali.cintura)
        setAbd(avali.abdomen)
        setQuad(avali.quadril)
        setPantd(avali.panturrilhaDireita)
        setPante(avali.panturrilhaEsquerda)
        setCd(avali.coxaDireita)
        setCe(avali.coxaEsquerda)
        setCpd(avali.coxaProximalDireita)
        setCpe(avali.coxaProximalEsquerda)
      });
    }
  }, []);

  useEffect(() => {
    if(altura==="" || peso===""){
      setPesoIdeal("")
      setImc("")
      setEstado("")
    }else{

      const pi = ((altura**2)*22).toFixed(3)
      const imcc = (peso/(altura**2)).toFixed(1)
      setPesoIdeal(pi)
      setImc(imcc)
      let est = ""
      if(imcc<18.5){
        est = "Abaixo do peso"
      }else if(imcc<=24.9){
        est = "Peso Normal"
      }else if(imcc<=29.9){
        est = "Sobrepeso"
      }else if(imcc<=34.9){
        est = "Obesidade grau 1"
      }else if(imcc<=39.9){
        est = "Obesidade grau 2"
      }else if(imcc>=40){
        est = "Obesidade grau 3"
      }
      
      setEstado(est)
    }
     
  
  },[peso,altura])


  async function salvar(e) {
    e.preventDefault();
    const ava = {
      tipo: "antropometrica",
      titulo: titulo,
      data: data,
      peso: peso,
      altura: altura,
      disponivel: true,
      bracoDireitoRelaxado: brd,
      bracoEsquerdoRelaxado: bre,
      bracoDireitoContraido: bcd,
      bracoEsquerdoContraido: bce,
      antebracoDireito: ad,
      antebracoEsquerdo: ae,
      punhoDireito: pd,
      punhoEsquerdo:pe,
      pescoco: pesc,
      ombro: omb,
      peitoral: peit,
      cintura: cint,
      abdomen: abd,
      quadril: quad,
      panturrilhaDireita: pantd,
      panturrilhaEsquerda: pante,
      coxaDireita: cd,
      coxaEsquerda: ce,
      coxaProximalDireita: cpd,
      coxaProximalEsquerda: cpe,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/antropometrica/${id}`, ava);
    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Avaliação cadastrada com sucesso",
        time: 2000,
      });
      setTimeout(() => {
        history.push(`/paciente/tratamento/${id}`);
      }, 1000);
    } else {
      toast.current.show({
        severity: "error",
        summary: "erro!",
        detail: "Erro no cadastro",
        time: 7000,
      });
    }
  }

  async function atualizar(ava) {
    ava.id = idAvaliacao
    const res = await api.put(`api/tratamento/antropometrica/${id}`, ava);
    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Avaliação Atualizada com sucesso",
        time: 2000,
      });
      setTimeout(() => {
        history.push(`/paciente/tratamento/${id}`);
      }, 1500);
    } else {
      toast.current.show({
        severity: "error",
        summary: "erro!",
        detail: "ops, ocorreu alguam erro na atualização",
        time: 7000,
      });
    }
  }

  return (
    <>
      <Tratamento abaMenu={3}>
      <Toast ref={toast} />
        <div className="Antropometrica">
          <form className="formulario" onSubmit={salvar}>
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-9">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  type="text"
                  placeholder="Digite o título desta avaliação"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  minLength="2"
                  maxLength="200"
                />
              </div>

              <div className="p-field p-col-12 p-md-3">
                <label htmlFor="data">Data</label>
                <Calendar
                  id="data"
                  value={data}
                  dateFormat="dd/mm/yy"
                  locale="pt-br"
                  monthNavigator
                  mask="99/99/9999"
                  placeholder={"Data"}
                  showIcon
                  icon="pi pi-calendar"
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="medidasbasicas">
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="peso">Peso</label>
                  <InputText
                    id="peso"
                    type="number"
                    placeholder="Ex. 70kg"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                    size="3.00"
                    step="0.001"
                    min="0"
                    max="600"
                    
                    tooltip="Digite o peso em kg"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="altura">Altura</label>
                  <InputText
                    id="altura"
                    type="number"
                    placeholder="Ex. 1.65"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    required
                    size="3.00"
                    step="0.01"
                    min="0"
                    max="3"
                    tooltip="Digite a altura em metros"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="pesoIdeal">Peso ideal</label>
                  <InputText
                    id="pesoIdeal"
                    type="number"
                    placeholder="Peso Ideal"
                    value={pesoIdeal}
                    onChange={(e) => setPesoIdeal(e.target.value)}
                    readOnly={true}
                    size="3.00"
                    step="0.005"
                    min="0"
                    max="600"
                    tooltip="Estimativa média do peso ideal"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>

                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="imc">IMC</label>
                  <InputText
                    id="imc"
                    type="number"
                    placeholder="IMC"
                    value={imc}
                    onChange={(e) => setImc(e.target.value)}
                    readOnly={true}
                    size="3"
                    step="0.1"
                    min="0"
                    max="60"
                    tooltip="Índice de massa corporal"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
                <div className="p-field p-col-12 p-md-4">
                  <label htmlFor="resultado">{estado?"Estado Atual":""}</label>
                  <h3 htmlFor="EstadoImc" style={{justifyContent:"flex-start", alignItems:"center", height: "40px", display:"flex" ,color:"blueviolet"}}>{estado}</h3>
                </div>
              </div>
               <div className="circunferencia">
                    <InputMedida value={brd} setValue={setBrd} titulo="Braço relaxado (direito)"/>
                    <InputMedida value={bre} setValue={setBre} titulo="Braço relaxado (esquerdo)"/>
                    <InputMedida value={bcd} setValue={setBcd} titulo="Braço contraido (direito)"/>
                    <InputMedida value={bce} setValue={setBce} titulo="Braço contraido (esquerdo)"/>
                    <InputMedida value={ad} setValue={setAd} titulo="Antebraço (direito)"/>
                    <InputMedida value={ae} setValue={setAe} titulo="Antebraço (esquerdo)"/>
                    <InputMedida value={pd} setValue={setPd} titulo="Punho (direito)"/>
                    <InputMedida value={pe} setValue={setPe} titulo="Punho (esquerdo)"/>
                    <InputMedida value={pesc} setValue={setPesc} titulo="Pescoço"/>
                    <InputMedida value={omb} setValue={setOmb} titulo="Ombro"/>
                    <InputMedida value={peit} setValue={setPeit} titulo="Peitoral"/>
                    <InputMedida value={cint} setValue={setCint} titulo="Cintura"/>
                    <InputMedida value={abd} setValue={setAbd} titulo="Abdomen"/>
                    <InputMedida value={quad} setValue={setQuad} titulo="Quadril"/>
                    <InputMedida value={pantd} setValue={setPantd} titulo="Panturrilha (direita)"/>
                    <InputMedida value={pante} setValue={setPante} titulo="Panturrilha (esquerda)"/>
                    <InputMedida value={cd} setValue={setCd} titulo="Coxa (direita)"/>
                    <InputMedida value={ce} setValue={setCe} titulo="Coxa (esquerda)"/>
                    <InputMedida value={cpd} setValue={setCpd} titulo="Coxa proximal (direita)"/>
                    <InputMedida value={cpe} setValue={setCpe} titulo="Coxa proximal (esquerda)"/>
               </div>

              <div className="botoes">
                <Button
                  type="submit"
                  id="btSalvar"
                  label="Salvar"
                  icon="pi pi-save"
                  iconPos="left"
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </Tratamento>
    </>
  );
}
