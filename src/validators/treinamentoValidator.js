const treinamentoValidator = {
  navio: {
    required: "O nome do navio é obrigatório.",
    minLength: {
      value: 4,
      message: "Mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Máximo de 30 caracteres.",
    },
  },
  guerra: {
    required: "O nome do comandante é obrigatório.",
  },
  classe: {
    required: "A classe do navio é obrigatória.",
    minLength: {
      value: 4,
      message: "Mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Máximo de 30 caracteres.",
    },
  },
  tipo: {
    required: "O nome do treinamento é obrigatório.",
    minLength: {
      value: 4,
      message: "Mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 40,
      message: "Máximo de 40 caracteres.",
    },
  },
  marinheiro: {
    required: "A quantidade de marinheiros é obrigatória.",
    pattern: {
      value: /^[0-9]+$/,
      message: "Informe apenas números.",
    },
  },
  data: {
    required: "A data do treinamento é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato inválido. Use: dd/mm/aaaa",
    },
  },
  situacao: {
    required: "O nível do treinamento é obrigatório.",
  },
};

export default treinamentoValidator;
