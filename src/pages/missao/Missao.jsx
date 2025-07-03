import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player/youtube'
import missaoValidator from '../../validators/missaoValidator'
import MissaoService from '../../services/academico/MissaoService'
import ConstrucaoService from '../../services/academico/ConstrucaoService'
import ComandatesService from '../../services/academico/ComandatesService'
import { mask } from 'remask'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import LoadingNaval from '../../components/LoadingNaval';

const Missao = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const missao = ConstrucaoService.getAll()
  const comandante = ComandatesService.getAll()

  useEffect(() => {
    if (params.id) {
      const manu = MissaoService.get(params.id)
      for (let campo in manu) {
        setValue(campo, manu[campo])
      }
    }
  }, [params.id, setValue])

  function salvar(dados) {
    setIsSubmitting(true)
    setTimeout(() => {
      params.id
        ? MissaoService.update(params.id, dados)
        : MissaoService.create(dados)

      setIsSubmitting(false)
      navigate("/missao")
    }, 1000)
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
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
          url="https://youtu.be/gEX6iPea0gw"
        />
      </div>

      {/* Título */}
      <div className="text-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3 text-blue-400">
          <PrivacyTipIcon sx={{ fontSize: 40 }} />
          Inserir Missão Naval
        </h1>
        <p className="text-gray-400 mt-2">Preencha os dados para cadastrar uma missão</p>
      </div>

      {/* Formulário */}
      <Form
        onSubmit={handleSubmit(salvar)}
        className="bg-slate-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg border border-slate-600 space-y-4"
      >
        <Form.Group controlId="nome">
          <Form.Label>Nome do Navio</Form.Label>
          <Form.Select
            {...register("nome", missaoValidator.nome)}
            isInvalid={!!errors.nome}
          >
            <option value="">Selecione o navio</option>
            {missao.map((n, i) => (
              <option key={i} value={n.nome}>{n.nome}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="guerra">
          <Form.Label>Nome do Comandante</Form.Label>
          <Form.Select
            isInvalid={!!errors.guerra}
            {...register("guerra", missaoValidator.guerra)}
          >
            <option value="">Selecione o nome do Comandante</option>
            {comandante.map((item, i) => (
              <option key={i} value={item.guerra}>{item.guerra}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.guerra?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="classe">
          <Form.Label>Nome da Classe do Navio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe Nome da classe do navio"
            isInvalid={!!errors.classe}
            {...register("classe", missaoValidator.classe)}
          />
          <Form.Control.Feedback type="invalid">{errors.classe?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="missao">
          <Form.Label>Missão</Form.Label>
          <Form.Control
            type="text"
            placeholder="Informe qual é a Missão"
            isInvalid={!!errors.missao}
            {...register("missao", missaoValidator.missao)}
          />
          <Form.Control.Feedback type="invalid">{errors.missao?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="data">
          <Form.Label>Data da Missão</Form.Label>
          <Form.Control
            type="text"
            placeholder="dd/mm/aaaa"
            mask="99/99/9999"
            onChange={handleChange}
            isInvalid={!!errors.data}
            {...register("data", missaoValidator.data)}
          />
          <Form.Control.Feedback type="invalid">{errors.data?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="situacao">
          <Form.Label>Situação</Form.Label>
          <Form.Select
            isInvalid={!!errors.situacao}
            {...register("situacao", missaoValidator.situacao)}
          >
            <option value="">Selecione a situação</option>
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.situacao?.message}</Form.Control.Feedback>
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
          <KeyboardBackspaceIcon />
          Voltar
        </Link>
      </div>
    </div>
  )
}

export default Missao
