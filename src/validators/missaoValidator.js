const missaoValidator = {
    nome: {
        required: "O campo Nome do Navio é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
        min: {
            value: 3,
            message: "O valor mínimo é 3"
        },
    },
    missao: {
        required: "O campo Missão é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
        min: {
            value: 3,
            message: "O valor mínimo é 3"
        },
    },
    data: {
    required: "O campo Data da Missão é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    classe: {
    required: "O campo Classe é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
}


export default missaoValidator