const construcaoValidator = {
  nome: {
    required: "Nome do navio é obrigatório.",
    minLength: {
      value: 6,
      message: "Nome deve ter ao menos 6 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Nome excede o limite de 30 caracteres.",
    },
  },
  radar: {
    required: "Radar é obrigatório.",
    minLength: {
      value: 4,
      message: "Radar deve ter no mínimo 4 caracteres.",
    },
  },
  siste: {
    required: "Sistema de defesa é obrigatório.",
    minLength: {
      value: 4,
      message: "Sistema deve ter no mínimo 4 caracteres.",
    },
  },
  carac: {
    required: "Características são obrigatórias.",
    minLength: {
      value: 6,
      message: "Características devem ter ao menos 6 caracteres.",
    },
  },
  data: {
    required: "Data de entrega é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato válido: dd/mm/aaaa",
    },
  },
  custo: {
    required: "Investimento é obrigatório.",
    pattern: {
      value: /^[\d.,]+$/,
      message: "Informe um valor numérico válido.",
    },
  },
  imges: {
    required: "Selecione o tipo de navio.",
  },
};

export default construcaoValidator;
