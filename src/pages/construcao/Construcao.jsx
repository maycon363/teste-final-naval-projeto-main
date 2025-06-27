import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import construcaoValidator from '../../validators/construcaoValidator';
import ConstrucaoService from '../../services/academico/ConstrucaoService';
import { mask } from 'remask';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Construcao = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (params.id) {
      const construc = ConstrucaoService.get(params.id);
      for (let campo in construc) {
        setValue(campo, construc[campo]);
      }
    }
  }, []);

  function salvar(dados) {
    setIsSubmitting(true);
    setTimeout(() => {
      if (params.id) {
        ConstrucaoService.update(params.id, dados);
      } else {
        ConstrucaoService.create(dados);
      }
      setIsSubmitting(false);
      navigate('/construcao');
    }, 800);
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask');
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  return (
    <div>
      <div className='para mb-3'>
        <ReactPlayer playing={true} loop={true} controls={false} url='https://youtu.be/Mm7_Abtj8-c' />
      </div>
      <Form className="mb-3" style={{ background: '#1C1C1C', color: 'white', padding: '12px' }}>
        <div className="text-center">
          <h1><ShoppingCartIcon sx={{ fontSize: 60 }} color="primary" /> Inserir Navio para Construção</h1>
        </div>

        <Form.Group className="mb-3" controlId="imges">
          <Form.Select aria-label="Default select example" {...register("imges", construcaoValidator.imgs)}>
            <option>Selecione o tipo de Navio</option>
            <option value={"28"}>Cruzador</option>
            <option value={"27"}>Porta-Aviões</option>
            <option value={"26"}>Porta-helicopteros</option>
            <option value={"25"}>Destroyer</option>
            <option value={"24"}>Submarino</option>
            <option value={"23"}>Fragata</option>
            <option value={"22"}>Coverta</option>
            <option value={"21"}>Navio Patrulha</option>
            <option value={"20"}>Navio-tanque</option>
            <option value={"19"}>Navio Autônomo de Guerra</option>
            <option value={"18"}>Lancha de Guerra</option>
          </Form.Select>
        </Form.Group>

        <InputGroup className="mb-3" controlId="nome">
          <Form.Control
            isInvalid={errors.nome}
            {...register("nome", construcaoValidator.nome)}
            placeholder="Informe o Nome do Navio"
            type="text"
          />
        </InputGroup>

        <InputGroup className="mb-3" controlId="radar">
          <Form.Control
            isInvalid={errors.radar}
            {...register("radar", construcaoValidator.radar)}
            placeholder="Informe o Radar do Navio"
            type="text"
          />
        </InputGroup>
        {errors.radar && <p style={{ color: "OrangeRed" }}>{errors.radar.message}</p>}

        <InputGroup className="mb-3" controlId="siste">
          <Form.Control
            isInvalid={errors.siste}
            {...register("siste", construcaoValidator.siste)}
            placeholder="Informe Sistema de defesa do Navio"
            type="text"
          />
        </InputGroup>
        {errors.siste && <p style={{ color: "OrangeRed" }}>{errors.siste.message}</p>}

        <InputGroup className="mb-3" controlId="carac">
          <Form.Control
            isInvalid={errors.carac}
            {...register("carac", construcaoValidator.carac)}
            placeholder="Informe características do Navio"
          />
        </InputGroup>

        <InputGroup className="mb-3" controlId="data">
          <Form.Control
            isInvalid={errors.data}
            {...register("data", construcaoValidator.data)}
            placeholder="Informe Data limite da entrega"
            mask="99/99/9999"
            onChange={handleChange}
          />
        </InputGroup>
        {errors.data && <p style={{ color: "OrangeRed" }}>{errors.data.message}</p>}

        <InputGroup className="mb-3" controlId="custo">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            isInvalid={errors.custo}
            {...register("custo", construcaoValidator.custo)}
            placeholder="Informe o valor do Investimento"
            type="value"
          />
        </InputGroup>
        {errors.custo && <p style={{ color: "OrangeRed" }}>{errors.custo.message}</p>}

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
            <span>{isSubmitting ? "Salvando..." : "Salvar"}</span>
          </button>
        </div>
      </Form>

      <div className="text-center mb-5">
        <Link to={-1} className='btn btn-danger butao'><KeyboardBackspaceIcon />  Voltar</Link>
      </div>
    </div>
  );
}

export default Construcao;
