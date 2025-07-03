import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReactPlayer from 'react-player/youtube';
import { useForm } from 'react-hook-form';
import construcaoValidator from '../../validators/construcaoValidator';
import ConstrucaoService from '../../services/academico/ConstrucaoService';
import { mask } from 'remask';
import LoadingNaval from '../../components/LoadingNaval';

const Construcao = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      params.id
        ? ConstrucaoService.update(params.id, dados)
        : ConstrucaoService.create(dados);
      setIsSubmitting(false);
      navigate('/construcao');
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
          url="https://youtu.be/Mm7_Abtj8-c"
        />
      </div>

      {/* Título */}
      <div className="text-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
          <ShoppingCartIcon sx={{ fontSize: 40 }} />
          Inserir Navio para Construção
        </h1>
        <p className="text-gray-400 mt-2">Preencha os dados abaixo para cadastrar ou atualizar um navio em construção.</p>
      </div>

      {/* Formulário */}
      <Form
        onSubmit={handleSubmit(salvar)}
        className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
      >
        <Form.Group controlId="imges">
          <Form.Label>Tipo de Navio</Form.Label>
          <Form.Select
            {...register("imges", construcaoValidator.imges)}
            isInvalid={errors.imges}
          >
            <option value="">Selecione o tipo de Navio</option>
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
          <Form.Control.Feedback type="invalid">
            {errors.imges?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="nome">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Control
            type="text"
            {...register("nome", construcaoValidator.nome)}
            isInvalid={errors.nome}
            placeholder="Ex: Encouraçado Bahia"
          />
          <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="radar">
          <Form.Label>Radar do Navio</Form.Label>
          <Form.Control
            type="text"
            {...register("radar", construcaoValidator.radar)}
            isInvalid={errors.radar}
            placeholder="Radar instalado"
          />
          <Form.Control.Feedback type="invalid">{errors.radar?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="siste">
          <Form.Label>Sistema de Defesa</Form.Label>
          <Form.Control
            type="text"
            {...register("siste", construcaoValidator.siste)}
            isInvalid={errors.siste}
            placeholder="Sistema antimísseis, etc."
          />
          <Form.Control.Feedback type="invalid">{errors.siste?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="carac">
          <Form.Label>Características</Form.Label>
          <Form.Control
            type="text"
            {...register("carac", construcaoValidator.carac)}
            isInvalid={errors.carac}
            placeholder="Informe as características principais"
          />
          <Form.Control.Feedback type="invalid">{errors.carac?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="data">
          <Form.Label>Data Limite da Entrega</Form.Label>
          <Form.Control
            type="text"
            {...register("data", construcaoValidator.data)}
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
              {...register("custo", construcaoValidator.custo)}
              isInvalid={errors.custo}
              placeholder="Ex: 2.000.000"
            />
            <Form.Control.Feedback type="invalid">{errors.custo?.message}</Form.Control.Feedback>
          </InputGroup>
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

export default Construcao;
