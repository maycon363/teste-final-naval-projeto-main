const missaoValidator = {
  nome: {
    required: "Nome do navio é obrigatório.",
    minLength: {
      value: 4,
      message: "Nome precisa ter no mínimo 4 caracteres.",
    },
    maxLength: {
      value: 40,
      message: "Nome ultrapassa o limite de 40 caracteres.",
    },
  },
  guerra: {
    required: "Nome do comandante é obrigatório.",
  },
  classe: {
    required: "Classe do navio é obrigatória.",
    minLength: {
      value: 3,
      message: "Classe precisa ter no mínimo 3 caracteres.",
    },
    maxLength: {
      value: 30,
      message: "Classe ultrapassa o limite de 30 caracteres.",
    },
  },
  missao: {
    required: "Descrição da missão é obrigatória.",
    minLength: {
      value: 6,
      message: "Missão precisa ter no mínimo 6 caracteres.",
    },
    maxLength: {
      value: 100,
      message: "Descrição ultrapassa o limite de 100 caracteres.",
    },
  },
  data: {
    required: "Data da missão é obrigatória.",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato inválido. Use: dd/mm/aaaa",
    },
  },
  situacao: {
    required: "Situação da missão é obrigatória.",
  },
};

export default missaoValidator;
