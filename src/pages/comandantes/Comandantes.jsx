import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (params.id) {
            const comandante = ComandatesService.get(params.id);
            for (let campo in comandante) {
                setValue(campo, comandante[campo]);
            }
        }
    }, []);

    function salvar(dados) {
        setIsSubmitting(true);
        setTimeout(() => {
            if (params.id) {
                ComandatesService.update(params.id, dados);
            } else {
                ComandatesService.create(dados);
            }
            setIsSubmitting(false);
            navigate('/comandantes');
        }, 800);
    }

    function Change(event) {
        const mascara = event.target.getAttribute('mask');
        setValue(event.target.name, mask(event.target.value, mascara));
    }

    return (
        <div>
            <div className='para mb-3'>
                <ReactPlayer playing={true} loop={true} controls={false} url='https://youtu.be/TMT1IIcjw8g' />
            </div>
            <Form className="mb-3" style={{ background: '#1C1C1C', color: 'white', padding: "10px 12px" }}>
                <div className="text-center">
                    <h1><MilitaryTechIcon sx={{ fontSize: 50 }} color="primary" /> Inserir Novo Comandante</h1>
                </div>

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.guerra}
                        {...register("guerra", ComandantesValidator.guerra)}
                        placeholder="Nome de Guerra"
                    />
                </InputGroup>
                {errors.guerra && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.guerra.message}</p>}

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.email}
                        {...register("email", ComandantesValidator.email)}
                        placeholder="Informe seu E-mail"
                        type='email'
                    />
                    <InputGroup.Text>@exemplo.com</InputGroup.Text>
                </InputGroup>
                {errors.email && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.email.message}</p>}

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.idade}
                        {...register("idade", ComandantesValidator.idade)}
                        placeholder="Informe sua Idade"
                        type='number'
                    />
                </InputGroup>
                {errors.idade && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.idade.message}</p>}

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.data}
                        {...register("data", ComandantesValidator.data)}
                        placeholder="Data de Nascimento"
                        mask="99/99/9999"
                        onChange={Change}
                    />
                </InputGroup>
                {errors.data && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.data.message}</p>}

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.cpf}
                        {...register("cpf", ComandantesValidator.cpf)}
                        placeholder="Informe o seu CPF"
                        type='text'
                    />
                </InputGroup>
                {errors.cpf && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.cpf.message}</p>}

                <InputGroup className="mb-3">
                    <Form.Control
                        isInvalid={errors.rg}
                        {...register("rg", ComandantesValidator.rg)}
                        placeholder="Informe o seu RG"
                        type='text'
                    />
                </InputGroup>
                {errors.rg && <p style={{ color: "OrangeRed", background: "Black" }}>{errors.rg.message}</p>}

                <Form.Group className="mb-3" controlId="situacao">
                    <Form.Select {...register("situacao", ComandantesValidator.situacao)}>
                        <option value={"N"}>Selecione a situação do navio</option>
                        <option value={"A"}>Ativo</option>
                        <option value={"I"}>Inativo</option>
                    </Form.Select>
                </Form.Group>

                <div className="text-center mb-2">
                    <button
                        onClick={handleSubmit(salvar)}
                        disabled={isSubmitting}
                        type="button"
                        className={`inline-flex items-center justify-center gap-2 px-6 py-2 text-white text-lg font-medium rounded transition duration-200 ${isSubmitting
                                ? "bg-green-400 cursor-not-allowed opacity-70"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {isSubmitting ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        ) : (
                            <FaCheck size={18} />
                        )}
                        Salvar
                    </button>
                </div>
            </Form>
            <div className="text-center mb-5">
                <Link to={-1} className='btn btn-danger butao'><BsArrowLeft /> Voltar</Link>
            </div>
        </div>
    );
}

export default Comandantes;
