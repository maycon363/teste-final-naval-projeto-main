const armamentoValidator = {
    nome: {
        required: "O campo Nome do Armamento é Obrigatório",
        minLength: {
            value: 5,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    data: {
        required: "O campo Data de Entrega é Obrigatório",
        minLength: {
            value: 2,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    custo: {
        required: "O campo Investimento é Obrigatório",
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    quantidade: {
        required: "O campo Quantidade é Obrigatório",
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    imges: {
        required: "Selecione um Modelo de arma"
    },
}

export default armamentoValidator