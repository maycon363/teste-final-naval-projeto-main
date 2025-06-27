import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import servicoValidator from '../../validators/servicoValidator';
import ServicoService from '../../services/academico/ServicoService';
import { mask } from 'remask';
import ComandatesService from '../../services/academico/ComandatesService';
import SecurityIcon from '@mui/icons-material/Security';

const Servico = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const comandante = ComandatesService.getAll();

  useEffect(() => {
    if (params.id) {
      const servi = ServicoService.get(params.id);
      for (let campo in servi) {
        setValue(campo, servi[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    setIsSubmitting(true);
    setTimeout(() => {
      if (params.id) {
        ServicoService.update(params.id, dados);
      } else {
        ServicoService.create(dados);
      }
      setIsSubmitting(false);
      navigate("/servico");
    }, 1000);
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask');
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  return (
    <div>
      <div className='para mb-3'>
        <ReactPlayer playing loop controls={false} url='https://www.youtube.com/watch?v=77H-dL2EYzk' />
      </div>

      <Form className="mb-3" style={{ background: '#1C1C1C', color: 'white', padding: "12px" }}>
        <div className="text-center mb-4">
          <h1><SecurityIcon sx={{ fontSize: 50 }} color="primary" /> Inserir Navio para Serviço</h1>
        </div>

        <Form.Group className="mb-3" controlId="imgs">
          <Form.Label>Classe do Navio</Form.Label>
          <Form.Select {...register("imges", servicoValidator.imges)} isInvalid={errors.imges}>
            <option>Selecione a Classe do navio</option>
            <option value="28">Cruzador</option>
            <option value="27">Porta-Aviões</option>
            <option value="26">Porta-helicópteros</option>
            <option value="25">Destroyer</option>
            <option value="24">Submarino</option>
            <option value="23">Fragata</option>
            <option value="22">Corveta</option>
            <option value="21">Navio Patrulha</option>
            <option value="20">Navio-tanque</option>
            <option value="19">Navio Autônomo de Guerra</option>
            <option value="18">Lancha de Guerra</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.imges?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Tipo da Classe do Navio</Form.Label>
          <Form.Control
            isInvalid={errors.nome}
            {...register("nome", servicoValidator.nome)}
            placeholder="Informe o tipo da classe do navio"
          />
          <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="missao">
          <Form.Label>Tipo de Serviço</Form.Label>
          <Form.Control
            isInvalid={errors.missao}
            {...register("missao", servicoValidator.missao)}
            placeholder="Informe o tipo de serviço"
          />
          <Form.Control.Feedback type="invalid">{errors.missao?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="guerra">
          <Form.Label>Comandante</Form.Label>
          <Form.Select {...register("guerra", servicoValidator.guerra)} isInvalid={errors.guerra}>
            <option>Informe o nome do Comandante</option>
            {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.guerra?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data do Serviço</Form.Label>
          <Form.Control
            isInvalid={errors.data}
            {...register("data", servicoValidator.data)}
            placeholder="Informe a data do serviço"
            mask="99/99/9999"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="situacao">
          <Form.Label>Situação</Form.Label>
          <Form.Select {...register("situacao", servicoValidator.situacao)} isInvalid={errors.situacao}>
            <option value="">Informe a situação</option>
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.situacao?.message}</Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mb-4">
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
        <Link to={-1} className="btn btn-danger"><KeyboardBackspaceIcon /> Voltar</Link>
      </div>
    </div>
  );
};

export default Servico;
