const ComandantesValidator = {
    guerra: {
        required: "O campo Nome de Guerra é Obrigatório",
        minLength: {
            value: 5,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    idade: {
        required: "O campo Idade é Obrigatório",
        minLength: {
            value: 2,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    data: {
        required: "O campo Data de Nascimento é Obrigatório",
        maxLength: {
            value: 10,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    cpf: {
        required: "O campo CPF é Obrigatório",
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    rg: {
        required: "O campo RG é Obrigatório",
        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
}

export default ComandantesValidator