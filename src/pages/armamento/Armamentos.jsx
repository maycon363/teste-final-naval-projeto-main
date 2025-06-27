import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { FaCheck } from 'react-icons/fa'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mask } from 'remask';
import ArmamentosService from '../../services/academico/ArmamentosService';
import armamentoValidator from '../../validators/armamentoValidator';
import PaidIcon from '@mui/icons-material/Paid';

const Armamentos = () => {

    const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    function salvar(dados) {
        setIsSubmitting(true);
        // simula processo (ex: API)
        setTimeout(() => {
            if (params.id) {
                ArmamentosService.update(params.id, dados);
            } else {
                ArmamentosService.create(dados);
            }
            setIsSubmitting(false);
            navigate("/armamentos");
        }, 800);
    }
    return (
        <div>
            <div className='para mb-3'>
                <ReactPlayer playing={true} loop={true} controls={false} url='https://www.youtube.com/watch?v=Zsf38NYzo5Q' />
            </div>
            <div>
                <Form className="mb-3" style={{ background: '#1C1C1C', color: 'white', paddingTop: "8px", paddingLeft: "12px", paddingRight: "12px", paddingBottom: "10px" }}>
                    <div className="text-center">
                        <h1><PaidIcon sx={{ fontSize: 50 }} color="primary" />Inserir Equipamentos Bélicos</h1>
                    </div>
                    <Form.Group className="mb-3" controlId="ships">
                        <Form.Select {...register("imges", armamentoValidator.imges)}>
                            <option value={"erro"}>Selecione um armamento</option>
                            <optgroup label="Canhões">
                                <option value={"cp"}>Canhão Principal</option>
                                <option value={"cs"}>Canhão Secundário</option>
                            </optgroup>
                            <optgroup label="Mísseis">
                                <option value={"man"}>Anti-navio</option>
                                <option value={"mae"}>Anti-aéreo</option>
                            </optgroup>
                            <optgroup label="Outros">
                                <option value={"t"}>Torpedos</option>
                                <option value={"m"}>Metralhadora .50</option>
                                <option value={"ca"}>Arma anti-aérea</option>
                                <option value={"da"}>Drone de Ataque</option>
                                <option value={"lf"}>Lançador de Foguetes</option>
                            </optgroup>
                        </Form.Select>
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Control
                            isInvalid={errors.nome}
                            {...register("nome", armamentoValidator.nome)}
                            placeholder="Informe Nome do Armamento"
                            aria-label="Informe Nome do Armamento"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    {errors.nome && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.nome.message}</p>}
                    <InputGroup className="mb-3">
                        <Form.Control
                            isInvalid={errors.data}
                            {...register("data", armamentoValidator.data)}
                            placeholder="Informe Data limite da entrega"
                            aria-label="Informe Data limite da entrega"
                            mask="99/99/9999"
                            onChange={handleChange}
                        />
                    </InputGroup>
                    {errors.data && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.data.message}</p>}
                    <InputGroup className="mb-3" controlId="quantidade">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            isInvalid={errors.custo}
                            {...register("custo", armamentoValidator.custo)}
                            placeholder="Informe o Investimento"
                            aria-label="Informe o Investimento"
                            type='valor'
                        />
                    </InputGroup>
                    {errors.custo && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.custo.message}</p>}
                    <InputGroup className="mb-3" controlId="quantidade">
                        <Form.Control
                            isInvalid={errors.quantidade}
                            {...register("quantidade", armamentoValidator.quantidade)}
                            placeholder="Informe a Quantidade"
                            aria-label="Informe a Quantidade"
                            type='number'
                        />
                    </InputGroup>
                    {errors.quantidade && <p style={{ color: "OrangeRed", background: "Black", border: "15px", borderBlock: "10px" }}>{errors.quantidade.message}</p>}
                    <div className="text-center mb-4">
                        <button
                            onClick={handleSubmit(salvar)}
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
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
            </div>
            <div className="text-center mb-5" >
                <Link to={-1} className='btn btn-danger'><KeyboardBackspaceIcon />  Voltar</Link>
            </div>
        </div>
    )
}
export default Armamentos