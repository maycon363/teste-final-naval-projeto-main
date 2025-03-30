const servicoValidator = {
    nome: {
        required: "O campo Nome é Obrigatório",
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
        min: {
            value: 3,
            message: "O valor mínimo é 3"
        },
    },
    missao: {
        required: "O campo Tipo de Serviço é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    data: {
        required: "O campo Data é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    imgs: {
        required: "O campo Data é Obrigatório",
    },
}

export default servicoValidator