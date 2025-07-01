import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from "react-hook-form";
import ReactPlayer from 'react-player/youtube';
import treinamentoValidator from "../../validators/treinamentoValidator";
import TreinamentoService from "../../services/academico/TreinamentoService";
import { mask } from "remask";
import ComandatesService from "../../services/academico/ComandatesService";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LoadingNaval from '../../components/LoadingNaval';

const Treinamento = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const comandante = ComandatesService.getAll();

  useEffect(() => {
    if (params.id) {
      const servi = TreinamentoService.get(params.id);
      for (let campo in servi) {
        setValue(campo, servi[campo]);
      }
    }
  }, [params.id, setValue]);

  function salvar(dados) {
    setIsSubmitting(true);
    setTimeout(() => {
      params.id ? TreinamentoService.update(params.id, dados) : TreinamentoService.create(dados);
      setIsSubmitting(false);
      navigate("/treinamento");
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
      {/* Player de vídeo */}
      <div className="max-w-4xl mx-auto mb-6 rounded overflow-hidden shadow-lg border border-slate-700">
        <ReactPlayer
          playing
          loop
          controls={false}
          width="100%"
          height="360px"
          url='https://www.youtube.com/watch?v=f9br6kd08x4'
        />
      </div>

      {/* Título */}
      <div className="text-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
          <TrackChangesIcon sx={{ fontSize: 40 }} />
          Inserir Navio para Treinamento
        </h1>
        <p className="text-gray-400 mt-2">Preencha os dados corretamente abaixo</p>
      </div>

      {/* Formulário */}
      <Form
        onSubmit={handleSubmit(salvar)}
        className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
      >
        <Form.Group controlId="navio">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome do Navio"
            isInvalid={!!errors.navio}
            {...register("navio", treinamentoValidator.navio)}
          />
          <Form.Control.Feedback type="invalid">{errors.navio?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="guerra">
          <Form.Label>Nome do Comandante</Form.Label>
          <Form.Select
            isInvalid={!!errors.guerra}
            {...register("guerra", treinamentoValidator.guerra)}
          >
            <option value="">Informe Nome do Comandante</option>
            {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.guerra?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="classe">
          <Form.Label>Tipo da Classe do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe o tipo da classe do navio"
            isInvalid={!!errors.classe}
            {...register("classe", treinamentoValidator.classe)}
          />
          <Form.Control.Feedback type="invalid">{errors.classe?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="tipo">
          <Form.Label>Nome do Treinamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome do treinamento"
            isInvalid={!!errors.tipo}
            {...register("tipo", treinamentoValidator.tipo)}
          />
          <Form.Control.Feedback type="invalid">{errors.tipo?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="marinheiro">
          <Form.Label>Quantidade de Marinheiros</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Quantidade de marinheiros"
            isInvalid={!!errors.marinheiro}
            {...register("marinheiro", treinamentoValidator.marinheiro)}
          />
          <Form.Control.Feedback type="invalid">{errors.marinheiro?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="data">
          <Form.Label>Data do Treinamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Data do treinamento"
            mask="99/99/9999"
            onChange={handleChange}
            isInvalid={!!errors.data}
            {...register("data", treinamentoValidator.data)}
          />
          <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="situacao">
          <Form.Label>Nível do Treinamento</Form.Label>
          <Form.Select
            isInvalid={!!errors.situacao}
            {...register("situacao", treinamentoValidator.situacao)}
          >
            <option value="">Informe o nível do Treinamento</option>
            <option value="A">Nível Baixo</option>
            <option value="N">Nível Médio</option>
            <option value="I">Nível Alto</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.situacao?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Botão de salvar */}
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

      {/* Botão de voltar */}
      <div className="text-center mt-6">
        <Link to={-1} className="inline-flex items-center gap-2 text-sm text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
          <KeyboardBackspaceIcon />
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default Treinamento;
