import React, { useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import manutencaoValidator from '../../validators/manutencaoValidator';
import ManutencaoService from '../../services/academico/ManutencaoService';
import ReactPlayer from 'react-player/youtube'
import { useForm } from 'react-hook-form';
import { mask } from 'remask';
import EngineeringIcon from '@mui/icons-material/Engineering';

const Manutencao = () => {
    
  const params = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, formState: { errors },} = useForm();

  useEffect(() => {
    if (params.id) {
      const manu = ManutencaoService.get(params.id);

      for (let campo in manu) {
        setValue(campo, manu[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      ManutencaoService.update(params.id, dados);
    } else {
      ManutencaoService.create(dados);
    }
    navigate("/manutencao");
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
    return (
      <div>
        <div className='para mb-3'>
            <ReactPlayer playing={true} loop={true} controls={false} url='https://www.youtube.com/watch?v=RoU59T7BokM' />
        </div>
        <Form className="mb-3" style={{background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>
          <div className="text-center">
            <h1><EngineeringIcon sx={{ fontSize: 50 }} color="primary"/>Inserir Navio para Manutenção</h1>
          </div>
          <InputGroup className="mb-3" controlId="nome">
            <Form.Control
            isInvalid={errors.nome} 
            {...register("nome", manutencaoValidator.nome)}
            placeholder="Informe o Nome do Navio"
            aria-label="Informe o Nome do Navio"
            aria-describedby="basic-addon2"
            type="text"
            />
          </InputGroup>
          {errors.nome && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.nome.message}</p>}
          <InputGroup className="mb-3" controlId="classe">
            <Form.Control
            isInvalid={errors.classe} 
            {...register("classe", manutencaoValidator.classe )}
            placeholder="Informe o tipo do navio"
            aria-label="Informe o tipo do navio"
            aria-describedby="basic-addon2"
            />
          </InputGroup>
          {errors.classe && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.classe.message}</p>}
          <InputGroup className="mb-3" controlId="classe">
            <Form.Control
            isInvalid={errors.data} 
            {...register("data", manutencaoValidator.data )}
            placeholder="Informe Data Limite da Entrega"
            aria-label="Informe Data Limite da Entrega"
            mask="99/99/9999" 
            onChange={handleChange}
            type="data"
            />
          </InputGroup>
          {errors.data && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.data.message}</p>}
          <InputGroup className="mb-3" controlId="classe">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
            isInvalid={errors.custo} 
            {...register("custo", manutencaoValidator.custo)}
            placeholder="Informe o Investimento"
            aria-label="Informe o Investimento"
            type="text"
            />
          </InputGroup>
          {errors.custo && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.custo.message}</p>}
          <Form.Group className="mb-3" controlId="situacao">
            <Form.Select {...register("situacao", manutencaoValidator.situacao)}>
              <option>Informe o andamento da manutenção</option>
              <option value={"N"}>Não Iniciado</option>
              <option value={"A"}>Rapido</option>
              <option value={"I"}>Lento</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center mb-2 d-grid gap-2">
              <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>
          </div>          
        </Form>
        <div className="text-center mb-5">
          <Link to={-1} className='btn btn-danger butao'><BsArrowLeft />  Voltar</Link>
        </div> 
      </div>
    )
}

export default Manutencao