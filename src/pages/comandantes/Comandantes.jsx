import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { FaCheck } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mask } from 'remask';
import ComandatesService from '../../services/academico/ComandatesService';
import ComandantesValidator from '../../validators/ComandantesValidator';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const Comandantes = () => {

    const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  
    useEffect(() => {
        
        if (params.id) {
        const comandante = ComandatesService.get(params.id)

        for (let campo in comandante) {
            setValue(campo, comandante[campo])
        }
        }
    }, [])

    function salvar(dados) {

        if (params.id) {
            ComandatesService.update(params.id, dados)
        } else {
            ComandatesService.create(dados)
        }

        navigate('/comandantes')
    }

    function Change(event) {
        const mascara = event.target.getAttribute('mask')
        setValue(event.target.name, mask(event.target.value, mascara))
    }

     return (
        <div>
            <div className='para mb-3'>
                <ReactPlayer playing={true} loop={true} controls={false} url='https://youtu.be/TMT1IIcjw8g' />
            </div>
            <Form className="mb-3"  style={{background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px"}}>
                <div className="text-center">
                    <h1><MilitaryTechIcon sx={{ fontSize: 50 }} color="primary"/>Inserir Novo Comandante</h1>
                </div>  
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.guerra} 
                    {...register("guerra", ComandantesValidator.guerra )}
                    placeholder="Nome de Guerra"
                    aria-label="Nome de Guerra"
                    aria-describedby="basic-addon2"
                    />
                </InputGroup>
                {errors.guerra && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.guerra.message}</p>}     
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.email} 
                    {...register("email", ComandantesValidator.email )}
                    placeholder="Informe seu E-mail"
                    aria-label="Informe seu E-mail"
                    type='email'
                    />
                    <InputGroup.Text id="basic-addon2">@exemplo.com</InputGroup.Text>
                    {errors.email && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.email.message}</p>}
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.idade} 
                    {...register("idade", ComandantesValidator.idade )}
                    placeholder="Informe sua Idade"
                    aria-label="Informe sua Idade"
                    type='number'
                    />
                </InputGroup>
                {errors.idade && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.idade.message}</p>}
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.data} 
                    {...register("data", ComandantesValidator.data )}
                    placeholder="Data de Nascimento"
                    aria-label="Data de Nascimento"
                    mask="99/99/9999" onChange={Change}
                    />
                </InputGroup>
                {errors.data && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.data.message}</p>}
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.cpf} 
                    {...register("cpf", ComandantesValidator.cpf )}
                    placeholder="Informe o seu CPF"
                    aria-label="Informe o seu CPF"
                    type='Social Security Number'
                    />
                </InputGroup>
                {errors.cpf && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.cpf.message}</p>}
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={errors.rg} 
                    {...register("rg", ComandantesValidator.rg )}
                    placeholder="Informe o seu RG"
                    aria-label="Informe o seu RG"
                    type='rg'
                    />
                </InputGroup>
                {errors.rg && <p style={{color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px"}}>{errors.rg.message}</p>}
                <Form.Group className="mb-3" controlId="situacao">
                    <Form.Select {...register("situacao", ComandantesValidator.situacao)}>
                        <option value={"N"}>Selecione a situação do navio</option>
                        <option value={"A"}>Ativo</option>
                        <option value={"I"}>Inativo</option>
                    </Form.Select>
                </Form.Group>
                <div className="text-center mb-2 d-grid gap-2">
                    <Button onClick={handleSubmit(salvar)} size="lg" variant="success"><FaCheck /> Salvar</Button>{' '}
                </div>
            </Form>
            <div className="text-center mb-5" >
                <Link to={-1} className='btn btn-danger butao'><BsArrowLeft />  Voltar</Link>
            </div>  
        </div>
    )
}

export default Comandantes