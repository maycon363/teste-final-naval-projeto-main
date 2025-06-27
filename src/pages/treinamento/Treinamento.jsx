import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
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
      if (params.id) {
        TreinamentoService.update(params.id, dados);
      } else {
        TreinamentoService.create(dados);
      }
      setIsSubmitting(false);
      navigate("/treinamento");
    }, 1000);
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask');
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  return (
    <div>
      <div className='para mb-3'>
        <ReactPlayer playing loop controls={false} url='https://www.youtube.com/watch?v=f9br6kd08x4' />
      </div>

      <Form
        className="mb-3"
        style={{ background: '#1C1C1C', color: 'white', padding: "8px 12px 10px 12px" }}
        onSubmit={handleSubmit(salvar)}
      >
        <div className="text-center mb-4">
          <h1>
            <TrackChangesIcon sx={{ fontSize: 50 }} color="primary" /> Inserir Navio para Treinamento
          </h1>
        </div>

        <Form.Group className="mb-3" controlId="navio">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome do Navio"
            aria-label="Informe Nome do Navio"
            isInvalid={!!errors.navio}
            {...register("navio", treinamentoValidator.navio)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.navio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="guerra">
          <Form.Label>Nome do Comandante</Form.Label>
          <Form.Select
            aria-label="Informe Nome do Comandante"
            isInvalid={!!errors.guerra}
            {...register("guerra", treinamentoValidator.guerra)}
          >
            <option value="">Informe Nome do Comandante</option>
            {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.guerra?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="classe">
          <Form.Label>Tipo da Classe do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe o tipo da classe do navio"
            aria-label="Informe o tipo da classe do navio"
            isInvalid={!!errors.classe}
            {...register("classe", treinamentoValidator.classe)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.classe?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tipo">
          <Form.Label>Nome do Treinamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome do treinamento"
            aria-label="Informe Nome do treinamento"
            isInvalid={!!errors.tipo}
            {...register("tipo", treinamentoValidator.tipo)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.tipo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="marinheiro">
          <Form.Label>Quantidade de Marinheiros</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Quantidade de marinheiros"
            aria-label="Informe Quantidade de marinheiros"
            isInvalid={!!errors.marinheiro}
            {...register("marinheiro", treinamentoValidator.marinheiro)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.marinheiro?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data do Treinamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Data do treinamento"
            aria-label="Informe Data do treinamento"
            mask="99/99/9999"
            onChange={handleChange}
            isInvalid={!!errors.data}
            {...register("data", treinamentoValidator.data)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.data?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="situacao">
          <Form.Label>Nível do Treinamento</Form.Label>
          <Form.Select
            aria-label="Informe o nível do Treinamento"
            isInvalid={!!errors.situacao}
            {...register("situacao", treinamentoValidator.situacao)}
          >
            <option value="">Informe o nível do Treinamento</option>
            <option value="A">Nível baixo</option>
            <option value="N">Nível Médio</option>
            <option value="I">Nível Alto</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.situacao?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mb-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2 text-white text-lg font-medium rounded transition duration-200 ${isSubmitting
                ? "bg-green-400 cursor-not-allowed opacity-70"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {isSubmitting ? (
              <>
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
                Salvando...
              </>
            ) : (
              <>
                <FaCheck size={18} />
                Salvar
              </>
            )}
          </button>
        </div>
      </Form>

      <div className="text-center mb-3">
        <Link to={-1} className="btn btn-danger">
          <KeyboardBackspaceIcon /> Voltar
        </Link>
      </div>
    </div>
  );
};

export default Treinamento;
