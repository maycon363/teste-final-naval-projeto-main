const ComandantesValidator = {
  guerra: {
    required: "Nome de guerra é obrigatório.",
    minLength: {
      value: 5,
      message: "Nome deve conter ao menos 5 caracteres.",
    },
    maxLength: {
      value: 50,
      message: "Nome excede o limite de 50 caracteres.",
    },
  },
  email: {
    required: "E-mail é obrigatório.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "E-mail inválido.",
    },
  },
  idade: {
    required: "Idade é obrigatória.",
    min: {
      value: 18,
      message: "A idade mínima é 18 anos.",
    },
    max: {
      value: 80,
      message: "A idade máxima permitida é 80 anos.",
    },
  },
  data: {
    required: "Data de nascimento é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato válido: dd/mm/aaaa",
    },
  },
  cpf: {
    required: "CPF é obrigatório.",
    pattern: {
      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      message: "Formato válido: 000.000.000-00",
    },
  },
  rg: {
    required: "RG é obrigatório.",
    maxLength: {
      value: 15,
      message: "RG excede o limite de 15 caracteres.",
    },
  },
  situacao: {
    required: "Selecione a situação do comandante.",
  },
};

export default ComandantesValidator;
