import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import missaoValidator from '../../validators/missaoValidator'
import MissaoService from '../../services/academico/MissaoService'
import ConstrucaoService from '../../services/academico/ConstrucaoService'
import { mask } from 'remask'
import ComandatesService from '../../services/academico/ComandatesService'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const Missao = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const missao = ConstrucaoService.getAll();
  const comandante = ComandatesService.getAll();

  useEffect(() => {
    if (params.id) {
      const manu = MissaoService.get(params.id);
      for (let campo in manu) {
        setValue(campo, manu[campo]);
      }
    }
  }, [params.id, setValue]);

  function salvar(dados) {
    setIsSubmitting(true);
    setTimeout(() => {
      if (params.id) {
        MissaoService.update(params.id, dados);
      } else {
        MissaoService.create(dados);
      }
      setIsSubmitting(false);
      navigate("/missao");
    }, 1000);
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask');
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  return (
    <div>
      <div className='para mb-3'>
        <ReactPlayer playing loop controls={false} url='https://youtu.be/gEX6iPea0gw' />
      </div>
      <Form
        className="mb-3"
        style={{
          background: '#1C1C1C',
          color: 'white',
          paddingTop: "8px",
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingBottom: "10px"
        }}
        onSubmit={handleSubmit(salvar)}
      >
        <div className="text-center mb-4">
          <h1><PrivacyTipIcon sx={{ fontSize: 50 }} color="primary" /> Inserir Navio para Missão</h1>
        </div>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe o Nome do Navio"
            aria-label="Informe o Nome do Navio"
            isInvalid={!!errors.nome}
            {...register("nome", missaoValidator.nome)}
          />
          <Form.Control.Feedback type="invalid" className="text-center">
            {errors.nome?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="guerra">
          <Form.Label>Nome do Comandante</Form.Label>
          <Form.Select
            aria-label="Informe o nome do Comandante"
            isInvalid={!!errors.guerra}
            {...register("guerra", missaoValidator.guerra)}
          >
            <option value="">Selecione o nome do Comandante</option>
            {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid" className="text-center">
            {errors.guerra?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="classe">
          <Form.Label>Nome da Classe do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome da classe do navio"
            aria-label="Informe Nome da classe do navio"
            isInvalid={!!errors.classe}
            {...register("classe", missaoValidator.classe)}
          />
          <Form.Control.Feedback type="invalid" className="text-center">
            {errors.classe?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="missao">
          <Form.Label>Missão</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe qual é a Missão"
            aria-label="Informe qual é a Missão"
            isInvalid={!!errors.missao}
            {...register("missao", missaoValidator.missao)}
          />
          <Form.Control.Feedback type="invalid" className="text-center">
            {errors.missao?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data da Missão</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Data da Missão"
            aria-label="Informe Data da Missão"
            mask="99/99/9999"
            onChange={handleChange}
            isInvalid={!!errors.data}
            {...register("data", missaoValidator.data)}
          />
          <Form.Control.Feedback type="invalid" className="text-center">
            {errors.data?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="situacao">
          <Form.Label>Situação</Form.Label>
          <Form.Select
            aria-label="Selecione a situação"
            isInvalid={!!errors.situacao}
            {...register("situacao", missaoValidator.situacao)}
          >
            <option value="">Selecione a situação</option>
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid" className="text-center">
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
        <Link to={-1} className='btn btn-danger'>
          <KeyboardBackspaceIcon /> Voltar
        </Link>
      </div>
    </div>
  )
}

export default Missao
