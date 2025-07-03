import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import manutencaoValidator from '../../validators/manutencaoValidator';
import ManutencaoService from '../../services/academico/ManutencaoService';
import ReactPlayer from 'react-player/youtube';
import { useForm } from 'react-hook-form';
import { mask } from 'remask';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LoadingNaval from '../../components/LoadingNaval';

const Manutencao = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      const manu = ManutencaoService.get(params.id);
      for (let campo in manu) {
        setValue(campo, manu[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    setIsSubmitting(true);
    setTimeout(() => {
      params.id
        ? ManutencaoService.update(params.id, dados)
        : ManutencaoService.create(dados);

      setIsSubmitting(false);
      navigate("/manutencao");
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
      {/* Vídeo de introdução */}
      <div className="max-w-4xl mx-auto mb-6 rounded overflow-hidden shadow-lg border border-slate-700">
        <ReactPlayer
          playing
          loop
          controls={false}
          width="100%"
          height="360px"
          url="https://www.youtube.com/watch?v=RoU59T7BokM"
        />
      </div>

      {/* Título */}
      <div className="text-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
          <EngineeringIcon sx={{ fontSize: 40 }} />
          Inserir Navio para Manutenção
        </h1>
        <p className="text-gray-400 mt-2">Preencha os dados abaixo para cadastrar ou atualizar uma manutenção naval.</p>
      </div>

      {/* Formulário */}
      <Form
        onSubmit={handleSubmit(salvar)}
        className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
      >
        <Form.Group controlId="nome">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            {...register("nome", manutencaoValidator.nome)}
            isInvalid={errors.nome}
            placeholder="Ex: Fragata Liberal"
          />
          <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="classe">
          <Form.Label>Tipo / Classe</Form.Label>
          <Form.Control
            {...register("classe", manutencaoValidator.classe)}
            isInvalid={errors.classe}
            placeholder="Ex: Classe Niterói"
          />
          <Form.Control.Feedback type="invalid">{errors.classe?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="data">
          <Form.Label>Data Limite da Entrega</Form.Label>
          <Form.Control
            {...register("data", manutencaoValidator.data)}
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
              {...register("custo", manutencaoValidator.custo)}
              isInvalid={errors.custo}
              placeholder="Ex: 1.200.000"
              type="text"
            />
            <Form.Control.Feedback type="invalid">{errors.custo?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="situacao">
          <Form.Label>Andamento da Manutenção</Form.Label>
          <Form.Select
            {...register("situacao", manutencaoValidator.situacao)}
            isInvalid={errors.situacao}
          >
            <option value="">Selecione o andamento</option>
            <option value="N">Não Iniciado</option>
            <option value="A">Rápido</option>
            <option value="I">Lento</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.situacao?.message}
          </Form.Control.Feedback>
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

export default Manutencao;
