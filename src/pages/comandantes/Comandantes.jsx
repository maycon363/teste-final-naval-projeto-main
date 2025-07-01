import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';
import { FaCheck } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mask } from 'remask';
import ComandatesService from '../../services/academico/ComandatesService';
import ComandantesValidator from '../../validators/ComandantesValidator';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LoadingNaval from '../../components/LoadingNaval';

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
            params.id
                ? ComandatesService.update(params.id, dados)
                : ComandatesService.create(dados);

            setIsSubmitting(false);
            navigate('/comandantes');
        }, 1000);
    }

    function handleChange(event) {
        const mascara = event.target.getAttribute('mask');
        setValue(event.target.name, mask(event.target.value, mascara));
    }
    if (isSubmitting) {
        return <LoadingNaval />;  // <-- Mostra o loading aqui
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen px-4 py-6 mb-2">
            {/* Player de vídeo */}
            <div className="max-w-4xl mx-auto mb-6 rounded overflow-hidden shadow-lg border border-slate-700">
                <ReactPlayer
                    playing
                    loop
                    controls={false}
                    width="100%"
                    height="360px"
                    url="https://youtu.be/TMT1IIcjw8g"
                />
            </div>

            {/* Título */}
            <div className="text-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
                    <MilitaryTechIcon sx={{ fontSize: 40 }} />
                    Inserir Novo Comandante
                </h1>
                <p className="text-gray-400 mt-2">Cadastre ou edite os dados de um comandante da frota naval.</p>
            </div>

            {/* Formulário */}
            <Form
                onSubmit={handleSubmit(salvar)}
                className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
            >
                <Form.Group controlId="guerra">
                    <Form.Label>Nome de Guerra</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("guerra", ComandantesValidator.guerra)}
                        isInvalid={errors.guerra}
                        placeholder="Ex: Falcão de Aço"
                    />
                    <Form.Control.Feedback type="invalid">{errors.guerra?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="email"
                            {...register("email", ComandantesValidator.email)}
                            isInvalid={errors.email}
                            placeholder="seuemail@exemplo.com"
                        />
                        <InputGroup.Text>@exemplo.com</InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="idade">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                        type="number"
                        {...register("idade", ComandantesValidator.idade)}
                        isInvalid={errors.idade}
                        placeholder="Ex: 45"
                    />
                    <Form.Control.Feedback type="invalid">{errors.idade?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="data">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("data", ComandantesValidator.data)}
                        isInvalid={errors.data}
                        placeholder="dd/mm/aaaa"
                        mask="99/99/9999"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cpf">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("cpf", ComandantesValidator.cpf)}
                        isInvalid={errors.cpf}
                        placeholder="Ex: 000.000.000-00"
                    />
                    <Form.Control.Feedback type="invalid">{errors.cpf?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="rg">
                    <Form.Label>RG</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("rg", ComandantesValidator.rg)}
                        isInvalid={errors.rg}
                        placeholder="Ex: 1234567"
                    />
                    <Form.Control.Feedback type="invalid">{errors.rg?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="situacao">
                    <Form.Label>Situação</Form.Label>
                    <Form.Select {...register("situacao", ComandantesValidator.situacao)}>
                        <option value="">Selecione a situação</option>
                        <option value="A">Ativo</option>
                        <option value="I">Inativo</option>
                    </Form.Select>
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

            {/* Voltar */}
            <div className="text-center mt-8">
                <Link to={-1} className="inline-flex items-center gap-2 text-sm text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
                    <BsArrowLeft fontSize="small" />
                    Voltar
                </Link>
            </div>
        </div>
    );
};

export default Comandantes;
