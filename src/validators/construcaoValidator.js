const construcaoValidator = {
    nome: {
        required: "O campo Nome do Navio é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
        min: {
            value: 3,
            message: "O valor mínimo é 3"
        },
    },
    classe: {
        required: "O campo Classe do Navio é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    radar: {
        required: "O campo Radar é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    siste: {
        required: "O campo Sistema de Defesa do Navio é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    carac: {
        required: "O campo Características do Navio é Obrigatório",
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
        required: "O campo Data é Obrigatório",
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
        required: "O campo Custo é Obrigatório",
        minLength: {
            value: 6,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
}

export default construcaoValidator