const manutencaoValidator = {
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
    classe: {
        required: "O campo Classe é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    data: {
        required: "O campo Data Limite da Entrega é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    custo: {
        required: "O campo Investimento é Obrigatório",
        minLength: {
            value: 2,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
}


export default manutencaoValidator