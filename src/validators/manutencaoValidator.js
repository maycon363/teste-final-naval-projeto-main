const manutencaoValidator = {
  nome: {
    required: "Nome do navio é obrigatório.",
    minLength: {
      value: 4,
      message: "O nome deve ter pelo menos 4 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Nome ultrapassa o limite de 30 caracteres.",
    },
  },
  classe: {
    required: "Classe do navio é obrigatória.",
    minLength: {
      value: 4,
      message: "Classe deve ter ao menos 4 caracteres.",
    },
    maxLength: {
      value: 25,
      message: "Classe ultrapassa o limite de 25 caracteres.",
    },
  },
  data: {
    required: "Data de entrega é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato inválido. Use: dd/mm/aaaa",
    },
  },
  custo: {
    required: "Investimento é obrigatório.",
    pattern: {
      value: /^[\d.,]+$/,
      message: "Valor inválido. Use apenas números e ponto/virgula.",
    },
  },
  situacao: {
    required: "Selecione o andamento da manutenção.",
  },
};

export default manutencaoValidator;
