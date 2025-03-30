import React, { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import ReactPlayer from 'react-player/youtube';
import treinamentoValidator from "../../validators/treinamentoValidator";
import TreinamentoService from "../../services/academico/TreinamentoService";
import { mask } from "remask";
import ComandatesService from "../../services/academico/ComandatesService";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const Treinamento = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, formState: { errors },} = useForm();

  const comandante = ComandatesService.getAll()

  useEffect(() => {
    if (params.id) {
      const servi = TreinamentoService.get(params.id);

      for (let campo in servi) {
        setValue(campo, servi[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      TreinamentoService.update(params.id, dados);
    } else {
      TreinamentoService.create(dados);
    }
    navigate("/treinamento");
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }

  return (
    <div>
      <div className='para mb-3' >
          <ReactPlayer playing={true} loop={true} controls={false} url='https://www.youtube.com/watch?v=f9br6kd08x4' />
      </div>
      <Form className="mb-3"  style={{background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>
        <div className="text-center">
            <h1><TrackChangesIcon sx={{ fontSize: 50 }} color="primary"/>Inserir Navio para Treinamento</h1>
        </div>
        <InputGroup className="mb-3">
          <Form.Control
          isInvalid={errors.navio} 
          {...register("navio", treinamentoValidator.navio)}
          placeholder="Informe Nome do Navio"
          aria-label="Informe Nome do Navio"
          aria-describedby="basic-addon2"
          type="text"
          />
        </InputGroup>
        {errors.navio && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.navio.message}</p>}
        <Form.Group className="mb-3" controlId="guerra">
            <Form.Select {...register("guerra", treinamentoValidator.guerra)}>
              <option>Informe Nome do Comandante</option>
              {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
              ))}
              {errors.guerra && <span>Campo Obrigatório</span>}
            </Form.Select>
        </Form.Group>
        <InputGroup className="mb-3" controlId="classe">
          <Form.Control
          isInvalid={errors.classe} 
          {...register("classe", treinamentoValidator.classe )}
          placeholder="Informe o tipo da classe do navio"
          aria-label="Informe o tipo da classe do navio"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        {errors.classe && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.classe.message}</p>}
        <InputGroup className="mb-3" controlId="classe">
          <Form.Control
          isInvalid={errors.tipo} 
          {...register("tipo", treinamentoValidator.tipo )}
          placeholder="Informe Nome do treinamento"
          aria-label="Informe Nome do treinamento"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        {errors.tipo && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.tipo.message}</p>}
        <InputGroup className="mb-3" controlId="marinheiro">
          <Form.Control
          isInvalid={errors.marinheiro} 
          {...register("marinheiro", treinamentoValidator.marinheiro )}
          placeholder="Informe Quatidade de marinheiros"
          aria-label="Informe Quatidade de marinheiros"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        {errors.marinheiro && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.marinheiro.message}</p>}
        <InputGroup className="mb-3" controlId="data">
          <Form.Control
          mask="99/99/9999" 
          onChange={handleChange}
          type="text"
          isInvalid={errors.data} 
          {...register("data", treinamentoValidator.data )}
          placeholder="Informe Data do treinamento"
          aria-label="Informe Data do treinamento"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        {errors.data && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.data.message}</p>}
        <Form.Group className="mb-3" controlId="situacao">
          <Form.Select aria-label="Informe o nível do Treinamento" {...register("situacao", treinamentoValidator.situacao)}>      
            <option value={"erro2"}>Informe o nível do Treinamento</option>
            <option value={"A"}>Nível baixo</option>
            <option value={"N"}>Nível Médio</option>
            <option value={"I"}>Nível Alto</option>
          </Form.Select>
        </Form.Group>
        <div className="text-center mb-2 d-grid gap-2">
          <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>
        </div>        
      </Form>
      <div className="text-center mb-3">
        <Link to={-1} className="btn btn-danger butao"><BsArrowLeft /> Voltar</Link>
      </div>
    </div>
  );
};

export default Treinamento;
