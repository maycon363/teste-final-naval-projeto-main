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
      if (params.id) {
        ManutencaoService.update(params.id, dados);
      } else {
        ManutencaoService.create(dados);
      }

      setIsSubmitting(false);
      navigate("/manutencao");
    }, 1000); // simula requisição
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask');
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  return (
    <div>
      <div className="para mb-3">
        <ReactPlayer playing loop controls={false} url="https://www.youtube.com/watch?v=RoU59T7BokM" />
      </div>

      <Form className="mb-3" style={{ background: '#1C1C1C', color: 'white', padding: "12px" }}>
        <div className="text-center mb-4">
          <h1><EngineeringIcon sx={{ fontSize: 50 }} color="primary" /> Inserir Navio para Manutenção</h1>
        </div>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.nome}
            {...register("nome", manutencaoValidator.nome)}
            placeholder="Informe o Nome do Navio"
          />
          <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="classe">
          <Form.Label>Tipo / Classe do Navio</Form.Label>
          <Form.Control
            isInvalid={errors.classe}
            {...register("classe", manutencaoValidator.classe)}
            placeholder="Informe o tipo do navio"
          />
          <Form.Control.Feedback type="invalid">{errors.classe?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data Limite da Entrega</Form.Label>
          <Form.Control
            isInvalid={errors.data}
            {...register("data", manutencaoValidator.data)}
            placeholder="Informe a Data Limite"
            mask="99/99/9999"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="custo">
          <Form.Label>Investimento</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              isInvalid={errors.custo}
              {...register("custo", manutencaoValidator.custo)}
              placeholder="Informe o Investimento"
              type="text"
            />
            <Form.Control.Feedback type="invalid">{errors.custo?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-4" controlId="situacao">
          <Form.Label>Andamento da Manutenção</Form.Label>
          <Form.Select {...register("situacao", manutencaoValidator.situacao)}>
            <option value="">Selecione o andamento</option>
            <option value="N">Não Iniciado</option>
            <option value="A">Rápido</option>
            <option value="I">Lento</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center mb-4">
          <button
            onClick={handleSubmit(salvar)}
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
                <FaCheck size={16} />
                Salvar
              </>
            )}
          </button>
        </div>
      </Form>

      <div className="text-center mb-5">
        <Link to={-1} className="btn btn-danger"><KeyboardBackspaceIcon /> Voltar</Link>
      </div>
    </div>
  );
};

export default Manutencao;
