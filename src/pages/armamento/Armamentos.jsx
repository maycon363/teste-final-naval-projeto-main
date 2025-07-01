import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player/youtube';
import { FaCheck } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mask } from 'remask';
import ArmamentosService from '../../services/academico/ArmamentosService';
import armamentoValidator from '../../validators/armamentoValidator';
import PaidIcon from '@mui/icons-material/Paid';
import LoadingNaval from '../../components/LoadingNaval';

const Armamentos = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (params.id) {
            const armamentos = ArmamentosService.get(params.id);
            for (let campo in armamentos) {
                setValue(campo, armamentos[campo]);
            }
        }
    }, []);

    function salvar(dados) {
        setIsSubmitting(true);
        setTimeout(() => {
            params.id
                ? ArmamentosService.update(params.id, dados)
                : ArmamentosService.create(dados);
            setIsSubmitting(false);
            navigate("/armamentos");
        }, 1000);
    }

    function handleChange(event) {
        const mascara = event.target.getAttribute('mask');
        setValue(event.target.name, mask(event.target.value, mascara));
    }
    if (isSubmitting) {
        return <LoadingNaval />;
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen px-4 py-6 mb-2">
            {/* Vídeo introdutório */}
            <div className="max-w-4xl mx-auto mb-6 rounded overflow-hidden shadow-lg border border-slate-700">
                <ReactPlayer
                    playing
                    loop
                    controls={false}
                    width="100%"
                    height="360px"
                    url="https://www.youtube.com/watch?v=Zsf38NYzo5Q"
                />
            </div>

            {/* Título */}
            <div className="text-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
                    <PaidIcon sx={{ fontSize: 40 }} />
                    Inserir Equipamentos Bélicos
                </h1>
                <p className="text-gray-400 mt-2">Cadastre ou atualize informações sobre armamentos de guerra.</p>
            </div>

            {/* Formulário */}
            <Form
                onSubmit={handleSubmit(salvar)}
                className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
            >
                <Form.Group controlId="imges">
                    <Form.Label>Tipo de Armamento</Form.Label>
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

                <Form.Group controlId="nome">
                    <Form.Label>Nome do Armamento</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("nome", armamentoValidator.nome)}
                        isInvalid={errors.nome}
                        placeholder="Ex: Míssil Exocet"
                    />
                    <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="data">
                    <Form.Label>Data Limite da Entrega</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("data", armamentoValidator.data)}
                        isInvalid={errors.data}
                        placeholder="dd/mm/aaaa"
                        mask="99/99/9999"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="custo">
                    <Form.Label>Investimento</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            {...register("custo", armamentoValidator.custo)}
                            isInvalid={errors.custo}
                            placeholder="Ex: 500.000"
                        />
                        <Form.Control.Feedback type="invalid">{errors.custo?.message}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="quantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        type="number"
                        {...register("quantidade", armamentoValidator.quantidade)}
                        isInvalid={errors.quantidade}
                        placeholder="Ex: 12"
                    />
                    <Form.Control.Feedback type="invalid">{errors.quantidade?.message}</Form.Control.Feedback>
                </Form.Group>

                {/* Botão */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${isSubmitting
                            ? "bg-green-400 cursor-not-allowed opacity-70"
                            : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <FaCheck />
                                Salvar
                            </>
                        )}
                    </button>
                </div>
            </Form>

            {/* Botão Voltar */}
            <div className="text-center mt-8">
                <Link to={-1} className="inline-flex items-center gap-2 text-sm text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
                    <KeyboardBackspaceIcon fontSize="small" />
                    Voltar
                </Link>
            </div>
        </div>
    );
};

export default Armamentos;
