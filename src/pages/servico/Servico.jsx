import React, { useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player'
import servicoValidator from '../../validators/servicoValidator';
import ServicoService from '../../services/academico/ServicoService'
import { mask } from 'remask';
import ComandatesService from '../../services/academico/ComandatesService';
import SecurityIcon from '@mui/icons-material/Security';

const Servico = () => {
    
  const params = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, formState: { errors },} = useForm();

  const comandante = ComandatesService.getAll()

  useEffect(() => {
    if (params.id) {
      const servi = ServicoService.get(params.id);

      for (let campo in servi) {
        setValue(campo, servi[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      ServicoService.update(params.id, dados);
    } else {
      ServicoService.create(dados);
    }
    navigate("/servico");
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
  
  return (
    <div>
        <div className='para mb-3'>
            <ReactPlayer playing={true} loop={true} controls={false} url='https://www.youtube.com/watch?v=77H-dL2EYzk' />
        </div>
          <div className="mb-3" style={{background: '#1C1C1C', color: 'white', paddingTop: "12px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>
            <Form>
            <div className="text-center">
              <h1><SecurityIcon sx={{ fontSize: 50 }} color="primary"/>Inserir Navio para Serviço</h1>
            </div>
              <Form.Group className="mb-3" controlId="imgs">
                <Form.Select placeholder="Selecione a Classe do navio" aria-label="Default select example" {...register("imgs", servicoValidator.imgs)}>
                  <option value={"erroA"}>Selecione a Classe do navio</option>
                  <option value={"18"}>Cruzador</option>
                  <option value={"17"}>Porta-Aviões</option>
                  <option value={"16"}>Porta-helicopteros</option>
                  <option value={"15"}>Destroyer</option>
                  <option value={"14"}>Submarino</option>
                  <option value={"13"}>Fragata</option>
                  <option value={"12"}>Coverta</option>
                  <option value={"11"}>Navio Patrulha</option>
                  <option value={"10"}>Navio-tanque</option>
                  <option value={"9"}>Navio Autônomo de Guerra</option>
                  <option value={"8"}>Lancha de Guerra</option>
                </Form.Select>
              </Form.Group>
              <InputGroup className="mb-3">
                  <Form.Control
                  isInvalid={errors.nome} 
                  {...register("nome", servicoValidator.nome )}
                  placeholder="Informe o tipo da classe do Navio"
                  aria-label="Informe o tipo da classe do Navio"
                  aria-describedby="basic-addon2"
                  />
              </InputGroup>
              {errors.missao && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.nome.message}</p>}
              <InputGroup className="mb-3">
                  <Form.Control
                  isInvalid={errors.missao} 
                  {...register("missao", servicoValidator.missao )}
                  placeholder="Informe Tipo de Serviço"
                  aria-label="Informe Tipo de Serviço"
                  aria-describedby="basic-addon2"
                  />
              </InputGroup>
              {errors.missao && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.missao.message}</p>}
              <Form.Group className="mb-3" controlId="guerra">
                <Form.Select isInvalid={errors.guerra} placeholder="Informe o nome do Comandante"{...register("guerra", servicoValidator.guerra)}>
                  <option>Informe o nome do Comandante</option>
                  {comandante.map((item, i) => (
                  <option key={i} value={item.guerra}>{item.guerra}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <InputGroup className="mb-3">
                  <Form.Control
                  isInvalid={errors.data} 
                  {...register("data", servicoValidator.data )}
                  placeholder="Informe data do Serviço"
                  aria-label="Informe data do Serviço"
                  mask="99/99/9999" 
                  onChange={handleChange}
                  />
              </InputGroup>
              {errors.data && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.data.message}</p>}
              <Form.Group className="mb-3" controlId="situacao">
                    <Form.Select {...register("situacao", servicoValidator.situacao)}>
                      <option value={"N"}>Informe a situação</option>
                      <option value={"A"}>Ativo</option>
                      <option value={"I"}>Inativo</option>
                    </Form.Select>
              </Form.Group>
              <div className="text-center mb-2 d-grid gap-2">
                <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>
              </div>                  
            </Form>
          </div>
        <div className="text-center mb-3">
          <Link to={-1} className='btn btn-danger butao'><BsArrowLeft />  Voltar</Link>
        </div>     
    </div>
  )
}

export default Servico