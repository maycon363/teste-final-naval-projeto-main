import React, { useEffect} from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import missaoValidator from '../../validators/missaoValidator'
import MissaoService from '../../services/academico/MissaoService'
import ConstrucaoService from '../../services/academico/ConstrucaoService'
import { mask } from 'remask'
import ComandatesService from '../../services/academico/ComandatesService'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const Missao = () => {

  const params = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, formState: { errors },} = useForm();

  const missao = ConstrucaoService.getAll()

  const comandante = ComandatesService.getAll()

  useEffect(() => {
    if (params.id) {
      const manu = MissaoService.get(params.id);

      for (let campo in manu) {
        setValue(campo, manu[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      MissaoService.update(params.id, dados);
    } else {
      MissaoService.create(dados);
    }
    navigate("/missao");
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }

  return (
    <div>
      <div className='para mb-3'>
        <ReactPlayer playing={true} loop={true} controls={false} url='https://youtu.be/gEX6iPea0gw' />
      </div>
      <Form className="mb-3"  style={{background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>
        <div className="text-center">
          <h1><PrivacyTipIcon sx={{ fontSize: 50 }} color="primary"/>Inserir Navio para Missão</h1>
        </div>
        <InputGroup className="mb-3" controlId="nome">
          <Form.Control
          isInvalid={errors.nome} 
          {...register("nome", missaoValidator.nome)}
          placeholder="Informe o Nome do Navio"
          aria-label="Informe o Nome do Navio"
          aria-describedby="basic-addon2"
          type="text"
          />
        </InputGroup>
        {errors.nome && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.nome.message}</p>}
        <Form.Group className="mb-3" controlId="guerra">
          <Form.Select {...register("guerra", missaoValidator.guerra)}>
            <option>Selecione o nome do Comandante</option>
            {comandante.map((item, i) => (
            <option key={i} value={item.guerra}>{item.guerra}</option>
              ))}
          </Form.Select>
        </Form.Group>
        <InputGroup className="mb-3" controlId="classe">
          <Form.Control
          isInvalid={errors.classe} 
          {...register("classe", missaoValidator.classe )}
          placeholder="Informe Nome da classe do navio"
          aria-label="Informe Nome da classe do navio"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3" controlId="missao">
          <Form.Control
          isInvalid={errors.missao} 
          {...register("missao", missaoValidator.missao )}
          placeholder="Informe qual é a Missão"
          aria-label="Informe qual é a Missão"
          aria-describedby="basic-addon2"
          />
        </InputGroup>
        {errors.missao && <span style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.missao.message}</span>}
        <InputGroup className="mb-3" controlId="data">
          <Form.Control
          isInvalid={errors.data} 
          {...register("data", missaoValidator.data )}
          placeholder="Informe Data da Missão"
          aria-label="Informe Data da Missão"
          aria-describedby="basic-addon2"
          mask="99/99/9999"
          onChange={handleChange}
          />
        </InputGroup>
        {errors.data && <span style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.data.message}</span>}
        <Form.Group className="mb-3" controlId="situacao">
          <Form.Select {...register("situacao", missaoValidator.situacao)}>
            <option value={"N"}>Selecione a situação</option>
            <option value={"A"}>Ativo</option>
            <option value={"I"}>Inativo</option>
          </Form.Select>
        </Form.Group>
        <div className="text-center mb-2 d-grid gap-2">
          <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>
        </div>            
      </Form>
      <div className="text-center mb-3">
        <Link to={-1} className='btn btn-danger butao'><BsArrowLeft />  Voltar</Link>
      </div> 
    </div>
  )
}

export default Missao