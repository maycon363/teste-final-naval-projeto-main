const armamentoValidator = {
  nome: {
    required: "Nome do armamento é obrigatório.",
    minLength: {
      value: 5,
      message: "O nome deve ter no mínimo 5 caracteres.",
    },
    maxLength: {
      value: 50,
      message: "O nome deve ter no máximo 50 caracteres.",
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
    maxLength: {
      value: 20,
      message: "Valor excede o limite permitido.",
    },
  },
  quantidade: {
    required: "Quantidade é obrigatória.",
    min: {
      value: 1,
      message: "Deve haver pelo menos 1 unidade.",
    },
    max: {
      value: 1000,
      message: "Valor máximo excedido.",
    },
  },
  imges: {
    required: "Selecione um tipo de armamento.",
  },
};

export default armamentoValidator;
