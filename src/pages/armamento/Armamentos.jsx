import React, { useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mask } from 'remask';
import ArmamentosService from '../../services/academico/ArmamentosService';
import armamentoValidator from '../../validators/armamentoValidator';
import PaidIcon from '@mui/icons-material/Paid';

const Armamentos = () => {

    const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
        useEffect(() => {
            
            if (params.id) {
            const armamentos = ArmamentosService.get(params.id)

            for (let campo in armamentos) {
                setValue(campo, armamentos[campo])
            }
            }
        }, [])

        function salvar(dados) {

            if (params.id) {
                ArmamentosService.update(params.id, dados)
            } else {
                ArmamentosService.create(dados)
            }

            navigate("/armamentos")
        }

        function handleChange(event) {
            const mascara = event.target.getAttribute('mask')
            setValue(event.target.name, mask(event.target.value, mascara))
        }
        return (
        <div>
            <div className='para mb-3'>
                <ReactPlayer playing={true} loop={true} controls={false} url='https://www.youtube.com/watch?v=Zsf38NYzo5Q' />
            </div>
            <div>
                <Form className="mb-3" style={{background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>          
                    <div className="text-center">
                        <h1><PaidIcon sx={{ fontSize: 60 }} color="primary" />Inserir Armamento</h1>
                    </div>
                    <Form.Group className="mb-3" controlId="ships">
                        <Form.Select placeholder="Selecione" aria-label="Default select example" {...register("imges", armamentoValidator.imges)}>
                            <option value={"erro"}>Selecione um armamento</option>
                            <option value={"cp"}>Canhão Principal</option>
                            <option value={"cs"}>Canhão Segundario</option>
                            <option value={"man"}>Mísseis Anti-navio</option>
                            <option value={"mae"}>Mísseis Anti-aéreo</option>
                            <option value={"t"}>Torpedos</option>
                            <option value={"m"}>Metralhadora .50</option>
                            <option value={"ca"}>Arma anti-aérea</option>
                            <option value={"da"}>Drone De Ataque</option>
                            <option value={"lf"}>Lançador de Foguetes</option>
                        </Form.Select>
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Control
                        isInvalid={errors.nome} 
                        {...register("nome", armamentoValidator.nome )}
                        placeholder="Informe Nome do Armamento"
                        aria-label="Informe Nome do Armamento"
                        aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    {errors.nome && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.nome.message}</p>}
                    <InputGroup className="mb-3">
                        <Form.Control
                        isInvalid={errors.data} 
                        {...register("data", armamentoValidator.data )}
                        placeholder="Informe Data limite da entrega"
                        aria-label="Informe Data limite da entrega"
                        mask="99/99/9999"
                        onChange={handleChange}
                        />
                    </InputGroup>
                    {errors.data && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.data.message}</p>}
                    <InputGroup className="mb-3" controlId="quantidade">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control 
                        isInvalid={errors.custo} 
                        {...register("custo", armamentoValidator.custo )}
                        placeholder="Informe o Investimento"
                        aria-label="Informe o Investimento"
                        type='valor'
                        />
                    </InputGroup>
                    {errors.custo && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.custo.message}</p>}
                    <InputGroup className="mb-3" controlId="quantidade">
                        <Form.Control
                        isInvalid={errors.quantidade} 
                        {...register("quantidade", armamentoValidator.quantidade )}
                        placeholder="Informe a Quantidade"
                        aria-label="Informe a Quantidade"
                        type='number'
                        />
                    </InputGroup>
                    {errors.quantidade && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.quantidade.message}</p>}
                    <div className="text-center mb-2 d-grid gap-2">
                        <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>{' '}
                    </div>
                </Form>
            </div>
            <div className="text-center mb-5" >          
                <Link to={-1} className='btn btn-danger butao'><BsArrowLeft />  Voltar</Link>
            </div>
        </div>
    )
}
export default Armamentos