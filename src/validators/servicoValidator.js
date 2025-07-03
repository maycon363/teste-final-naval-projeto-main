const servicoValidator = {
  imges: {
    required: "A classe do navio é obrigatória.",
  },
  nome: {
    required: "O tipo da classe do navio é obrigatório.",
    minLength: {
      value: 4,
      message: "Mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Máximo de 30 caracteres.",
    },
  },
  missao: {
    required: "O tipo de serviço é obrigatório.",
    minLength: {
      value: 4,
      message: "Mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 50,
      message: "Máximo de 50 caracteres.",
    },
  },
  guerra: {
    required: "O nome do comandante é obrigatório.",
  },
  data: {
    required: "A data do serviço é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato inválido. Use: dd/mm/aaaa",
    },
  },
  situacao: {
    required: "A situação é obrigatória.",
  },
};

export default servicoValidator;
